import React from 'react';
import { secsToString } from "../utils";

import './FragmentPosition.scss';

function FragmentPosition({ $player, fragment, progress, onFragmentChanged}) {
    const handlePlayCurrentFragment = () => {
        $player.playFragment(fragment.startSec, fragment.endSec, 'STAY_AT_START');
    }

    const handleJumpFragmentStart = () => {
        $player.seekToAndStop(fragment.startSec);
    }

    const handleJumpFragmentEnd = () => {
        $player.seekToAndStop(fragment.endSec);
    }

    const hanleSetCurrentTimeAsFragmentStart = () => {
        fragment.startSec = parseFloat(progress.toFixed(1));
        onFragmentChanged(fragment);
    }

    const hanleSetCurrentTimeAsFragmentEnd = () => {
        fragment.endSec = parseFloat(progress.toFixed(1));
        onFragmentChanged(fragment);
    }

    const renderFragmentPos = () => {
        const deltaBefore = (progress - fragment.startSec).toFixed(1);
        const deltaInFragment = (fragment.endSec - progress).toFixed(1);
        const deltaInAfter = (progress - fragment.endSec).toFixed(1);
        if (progress < fragment.startSec) {
            return <span className='before'>Before start <span>{deltaBefore}</span></span>
        }
        if (progress > fragment.endSec) {
            return <span className='after'>After END <span>{deltaInAfter}</span></span>
        }

        if (progress >= fragment.startSec && progress <= fragment.endSec) {
            return <span className='inside'>In fragment. After start {deltaBefore}; before end {deltaInFragment}</span>
        }
    }

    return (
        <div className='fragmentPosition'>
            <div class='title'>Fragment ({secsToString(fragment.startSec)} - {secsToString(fragment.endSec)})</div>
            <div class='playerPosition'>{renderFragmentPos()}</div>
            <div className='controls'>
                <div className='button' onClick={handlePlayCurrentFragment}>
                    Play the whole fragment
                </div>
                <div className='button'  onClick={handleJumpFragmentStart}>
                    Jump to fragment start
                </div>
                <div className='button'  onClick={handleJumpFragmentEnd}>
                    Jump to fragment end
                </div>
                <div className='button'  onClick={hanleSetCurrentTimeAsFragmentStart}>
                    Set current time as start time of the fragment
                </div>
                <div className='button'  onClick={hanleSetCurrentTimeAsFragmentEnd}>
                    Set current time as end time of the fragment
                </div>
            </div>
        </div>
    );
}

export default FragmentPosition;