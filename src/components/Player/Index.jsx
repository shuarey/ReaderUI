import React, { useState, useRef } from 'react';
import MatthewAudio from '../../assets/audio/Matthew.flac';
import PassageCard from '../PassageCard/Index';
import './Style.css';

const Player = () => {
    const [audioTime, setAudioTime] = useState(0); 
    const [audioDuration, setAudioDuration] = useState(0); 
    const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef(null);
const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
const handleTimeUpdate = () => {
        setAudioTime(audioRef.current.currentTime);
    };
const handleLoadedMetadata = () => {
        setAudioDuration(audioRef.current.duration);
    };
const handleProgressClick = (e) => {
        const progressBar = e.target;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressBar.offsetWidth;
        const newTime = (clickPosition / progressBarWidth) * audioDuration;
        audioRef.current.currentTime = newTime;
        setAudioTime(newTime);
    };
const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
return (
        <PassageCard book="Matthew" chapter="Chapter 7">
            <div className="bible-player">
                <p>Judge not, that you be not judged...</p>
                <audio
                    ref={audioRef}
                    src={MatthewAudio}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                />
                <div className="progress-container" onClick={handleProgressClick}>
                    <div
                        className="progress-bar"
                        style={{ width: `${(audioTime / audioDuration) * 100}%` }}
                    ></div>
                </div>
                <div className="player-controls">
                    <button onClick={togglePlay}>
                        {isPlaying ? 'Pause' : audioTime > 0 ? 'Resume' : 'Play'}
                    </button>
                    <span>
                        {formatTime(audioTime)} / {formatTime(audioDuration)}
                    </span>
                </div>
            </div>
        </PassageCard>
    );
};

export default Player;