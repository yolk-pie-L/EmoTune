import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { PlayCircleOutlined, PauseCircleOutlined, CaretRightOutlined} from '@ant-design/icons';
import { Button, Tooltip, Space ,Input, Slider} from 'antd';

export function MusicPlayer ({audio}){
  const audioUrl = audio;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false); // 音频播放完后切换为暂停状态
  };

  const onChange = (value) => {
    setCurrentTime(value);
  };
  
  const onAfterChange = (value) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };
  return (
    <>
    <Space>
        <button onClick={handlePlayPause}>
        {isPlaying ? <PauseCircleOutlined></PauseCircleOutlined> : <PlayCircleOutlined></PlayCircleOutlined>}
        </button>
        <Slider value={currentTime}
            max={duration}
            tooltip={{
                formatter: null,
            }}
            style={{width: '150px'}}
            onChange={onChange} onAfterChange={onAfterChange}
        />
    </Space>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={handleAudioEnded}
      />  
    </>
  );
};

export default MusicPlayer;
