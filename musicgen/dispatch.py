import boto3
import os
from flask import Flask, jsonify, request
import uuid
from threading import Thread
import time
import requests
import queue
import json
import sys
import threading

# create a Lock
lock = threading.Lock()

# initialize total_duration
total_duration = 0.0
epoch_duration=0

nodes=[
    ('i-076c3449386513d02','172.31.95.149'),
    ('i-00777613589011f65','172.31.95.216'),
    # ('i-0d282d31d8dd4279a',),
    ('i-0b188d36bf8986c15','172.31.85.93'),
    ('i-00b1d5b128b674df3','172.31.85.183'),
    ('i-048e17acab714914e','172.31.82.149'),
    ('i-0635feac6e5c76ffb','172.31.93.66'),
    ('i-064a68a396c184da7','172.31.92.206')
]

node_idx_max=len(nodes)-1
node_ctl=0 #first _ nodes are turned on
ctl_alpha=0.5

my_id='i-04009898882f61570'

task_queue = queue.Queue()
BUCKET_NAME='music-gen-files'
ACCESS_KEY = 'my_access_key'

LOG_FILE='dispatcher.log'

ec2 = boto3.client('ec2')
s3 = boto3.client('s3')

avg_throughput=0.1

active_count=0

start_time=time.time()

last_scaleup=time.time()
stop_interval=120


def stop_ec2_instance(instance_id):
    try:
        response = ec2.stop_instances(InstanceIds=[instance_id])
        print(response)
    except Exception as e:
        print(f"Exception occurred when stopping instance {instance_id}: {e}")

def start_ec2_instance(instance_id):
    try:
        response = ec2.start_instances(InstanceIds=[instance_id])
        print(response)
    except Exception as e:
        print(f"Exception occurred when starting instance {instance_id}: {e}")


def get_running():
    for idx,node in enumerate(nodes):
        if check_running(node[0]):
            yield idx

def check_running(instance_id):
    response = ec2.describe_instances(InstanceIds=[instance_id])
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            if instance_id==instance['InstanceId']:
                return instance['State']['Name']=='running'
    raise Exception('invalid instance ID')

def apply_ctl():
    # Control nodes based on the state
    for idx, (node_id, _) in enumerate(nodes):
        if idx<=node_ctl:  # if the node should be ON
            if not check_running(node_id):  # if the node is not running
                start_ec2_instance(node_id)
        else:  # if the node should be OFF
            if check_running(node_id):  # if the node is running
                stop_ec2_instance(node_id)

def monitor():
    node_throughputs = []
    active_count=0
    for _, (node_id, node_ip) in enumerate(nodes):
        if not check_running(node_id):
            continue
        url=f'http://{node_ip}:7777/monitor'
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data=json.loads(response.content)
                assert 'throughput' in data
                throughput = data['throughput']
                node_throughputs.append(throughput)
                active_count+=1
        except Exception as e:
            continue
    if len(node_throughputs)==0:
        print('failed to retrieve monitor info')
        return 0
    clip=0.3
    node_throughputs=[0.1 if x>5 else x for x in node_throughputs]
    node_throughputs=[x if x<clip else clip for x in node_throughputs]
    new_throughput=sum(node_throughputs)/len(node_throughputs)
    print(f'monitored throughput: {new_throughput:.2f}')
    global avg_throughput
    avg_throughput=ctl_alpha*avg_throughput+(1-ctl_alpha)*new_throughput
    print(f'moving avg: {avg_throughput:.2f}')
    
def node_schedule():
    with lock:
        target_throughput=total_duration/60
        print(f'target throughput: {target_throughput:.2f}, total duration: {total_duration:.2f}')
    global node_ctl
    estimate_total=(node_ctl+1)*avg_throughput
    if estimate_total< target_throughput and node_ctl<node_idx_max:
        node_ctl+=1
        global last_scaleup
        last_scaleup=time.time()
        print(f'SCALE UP -> {node_ctl}')
    if estimate_total>target_throughput and node_ctl>0:
        if time.time()-last_scaleup>stop_interval:
            node_ctl-=1
            print(f'SCALE DOWN -> {node_ctl}')
            

def schedule_log():
    global epoch_duration
    
    entry=f'[{(time.time()-start_time):.2f}] clt={node_ctl} target={(node_ctl+1)*avg_throughput:.2f} avg={avg_throughput:.2f} inqueue={total_duration:.2f} input={epoch_duration:.2f}'
    with lock:
        with open(LOG_FILE,'a') as f:
            f.write(entry+'\n')
    epoch_duration=0
    
def schedule():
    while True:
        global avg_throughput
        monitor()
        node_schedule()
        apply_ctl()
        schedule_log()
        time.sleep(10)


def dispatch():
    while True:
        if not task_queue.empty():
            task_input = task_queue.get()
            submit=False
            while not submit:
                for idx in get_running():
                    url=f'http://{nodes[idx][1]}:7777/put_task'
                    json_data=task_input
                    json_data['key']=ACCESS_KEY
                    json_data['cred']=creds_content
                    headers = {'User-Agent': 'curl/7.64.1'}
                    try:
                        response = requests.post(url, json=json_data, timeout=5, headers=headers)
                        code = response.status_code
                        # print(f'dispatch, code={code}')
                        if code == 200:
                            submit=True
                            with lock:
                                global total_duration
                                total_duration-=task_input['duration']
                            print(f'DISPATCH {task_input["task_id"]} -> node-{idx}')
                            with lock:
                                with open(LOG_FILE,'a') as f:
                                    f.write(f'DISPATCH -> {idx}'+'\n')
                            break
                    except Exception as e:
                        continue
                time.sleep(5)  # sleep for a bit before checking the queue again
            time.sleep(5)
            

app = Flask(__name__)
        
@app.route('/submit_task', methods=['POST'])
def submit_task():
    task_input = request.json
    if 'key' not in task_input or task_input['key'] != ACCESS_KEY:
        return 'Invalid key', 403
    task_queue.put(task_input)
    print(f'queue put: {str(task_input)}')
    with lock:
        global total_duration, epoch_duration
        epoch_duration+=task_input['duration']
        total_duration+=task_input['duration']
    return jsonify({'success': True}), 200


if __name__=='__main__':
    # sys.stdout = open('dispatcher.log', 'w')  # Standard output
    # sys.stderr = open('dispatcher_err.log', 'w')  # Standard error
    with open(LOG_FILE,'w+') as f:
        pass
    print('dispatcher start')
    global creds_content
    aws_creds_path = os.path.expanduser('~/.aws/credentials')
    with open(aws_creds_path, 'r') as credfile:
        creds_content = credfile.read()
    
    dispatcher_thread = Thread(target=dispatch)
    dispatcher_thread.start()
    scheduler_thread = Thread(target=schedule)
    scheduler_thread.start()
    app.run(host='0.0.0.0', port=7777, debug=False)

