import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

import './Player.css';

function Player({ fragments, videoUrl }) {
  const [duration, setDuration] = useState(0);
  const [fragment, setFragment] = useState('');
  const [playing, setPlaying] = useState(false);
  const [endSec, setEndSec] = useState(0);

  const $player = useRef(null);

  const handleClickFragment = (startSec, endSec, key) => {
    $player.current.seekTo(startSec, 'seconds');

    setFragment(key);
    setEndSec(endSec);
    setPlaying(true);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
    setEndSec(duration);
  };

  const handleProgress = ({ playedSeconds }) => {
    console.log(playedSeconds);
    if (playedSeconds > endSec) {
      setPlaying(false);
    }
  };

  const handleStop = () => {
      setPlaying(false);
  };

  return (
    <div className='app'>
      <div className='app__B'>
        <ReactPlayer
          ref={$player}
          url={videoUrl}
          width='100%'
          height='100%'
          onDuration={handleDuration}
          onProgress={handleProgress}
          progressInterval={100}
          onPause={handleStop}
          onEnded={handleStop}
          playing={playing}
          controls={true}
        />
      </div>

      <div className='app__C'>
        <div
          className={`player__fragment ${
            fragment === -1 ? 'player__fragment-active' : ''
          }`}
          onClick={handleClickFragment.bind(null, 0, duration, -1)}>
          <span className='player__fragment-title'>Play whole video</span>
        </div>

        {fragments.map(({ title, startSec, endSec }, key) => (
          <div
            key={key}
            onClick={handleClickFragment.bind(null, startSec, endSec, key)}
            className={`player__fragment ${
              fragment === key ? 'player__fragment-active' : ''
            }`}>
            <span className='player__fragment-title'>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Player;
