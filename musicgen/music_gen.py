from transformers import AutoProcessor, MusicgenForConditionalGeneration
import time
import scipy
import os
from flask import Flask, jsonify, request
from threading import Thread
import uuid
import subprocess
import requests
import sys
import threading
# https://music-gen-files.s3.amazonaws.com/test.txt
RESULT_FOLDER='results'
BUCKET_NAME='music-gen-files'
GEN_MODEL='facebook/musicgen-small'
ACCESS_KEY = 'my_access_key'

NOTIFY_API='https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/generationFinished'

headers = {
        'Authorization': 'Bearer m7Lppc2EJjPSMm96P9uGV6UDF',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537'
    }

lock = threading.Lock()
throughput=10#estimated

def init_model():
    global processor
    global model
    processor = AutoProcessor.from_pretrained(GEN_MODEL)
    model = MusicgenForConditionalGeneration.from_pretrained(GEN_MODEL)
    print(f'model loaded')


def gen(task_input, filename: str='a.wav'):
    prompt=task_input['prompt']
    duration=task_input['duration']
    task_id=task_input['task_id']
    start=time.time()
    inputs = processor(
            text=prompt,
        padding=True,
        return_tensors="pt",
    )

    audio_values = model.generate(**inputs, max_new_tokens=duration*50)
    gen_time=time.time()-start
    print(f'gen complete: {gen_time:.2f}s')
    sampling_rate = model.config.audio_encoder.sampling_rate
    wav_path=os.path.join(RESULT_FOLDER,filename)
    scipy.io.wavfile.write(wav_path, rate=sampling_rate, data=audio_values[0, 0].numpy())
    copy_to_s3(wav_path)
    url=f'https://music-gen-files.s3.amazonaws.com/{filename}'
    data={
        'url':url,
        'task_id':task_id,
    }
    global throughput
    with lock:
        throughput=duration/gen_time
    try:
        response = requests.post(NOTIFY_API, headers=headers, json=data, timeout=5)
        if response.status_code != 200:
            print(f'Notification failed. Status code: {response.status_code}, response: {response.text}')
    except Exception as e:
        print(f"Failed to send notification. Exception: {str(e)}")

def copy_to_s3(local_file_path, bucket_name=BUCKET_NAME):
    cmd = f"aws s3 cp {local_file_path} s3://{bucket_name}"
    print(f'copying: '+cmd)
    subprocess.run(cmd, shell=True, check=True)


app = Flask(__name__)
task_thread: Thread = None

def handle_task(task_input):
    task_id=task_input['task_id']
    fname=f'{task_id}.wav'
    print(f'handling task {task_id}')
    gen(task_input,fname)


@app.route('/put_task', methods=['POST'])
def put_task():
    task_input = request.json
    if 'key' not in task_input or task_input['key'] != ACCESS_KEY:
        return 'Invalid key', 403

    # Check and update AWS credentials
    if 'cred' in task_input:
        aws_creds_path = os.path.expanduser('~/.aws/credentials')
        with open(aws_creds_path, 'w') as credfile:
            credfile.write(task_input['cred'])

    # Handle the task
    global task_thread
    if task_thread is not None and task_thread.is_alive():
        return 'busy', 403

    task_thread = Thread(target=handle_task, args=(task_input,))
    task_thread.start()

    return jsonify({'success': True}), 200


@app.route('/busy', methods=['GET'])
def busy():
    return jsonify({'busy': task_thread is not None and task_thread.is_alive()}), 200

@app.route('/monitor', methods=['GET'])
def monitor():
    with lock:
        monitor_info = {
            'throughput':throughput
        }
    return jsonify(monitor_info), 200

if __name__ == '__main__':
    # sys.stdout = open('gen.log', 'w')  # Standard output
    # sys.stderr = open('gen_err.log', 'w')  # Standard error
    init_model()
    # gen(['80s pop track with bassy drums and synth', '90s rock song with loud guitars and heavy drums'],5)
    app.run(host='0.0.0.0', port=7777, debug=False)
