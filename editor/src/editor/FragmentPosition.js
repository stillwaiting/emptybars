import React from 'react';
import { secsToString } from "emptybars-common/utils";

import './FragmentPosition.scss';

function FragmentPosition({ $player, fragment, fragmentIdx, videoPlayerPosSecs, onFragmentChanged, getPrevFragmentEndSec}) {
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
        fragment.startSec = parseFloat(videoPlayerPosSecs.toFixed(1));
        onFragmentChanged(fragment, undefined, "update fragment start time");
    }

    const handleSetFragmentStartToLastFragmentEnd = () => {
        fragment.startSec = getPrevFragmentEndSec();
        onFragmentChanged(fragment, undefined, "update fragment start time");
    }

    const hanleSetCurrentTimeAsFragmentEnd = () => {
        fragment.endSec = parseFloat(videoPlayerPosSecs.toFixed(1));
        onFragmentChanged(fragment, undefined, 'update fragment end time');
    }

    const renderFragmentPos = () => {
        const deltaStart = (videoPlayerPosSecs - fragment.startSec);
        const deltaEnd = (videoPlayerPosSecs - fragment.endSec);

        var className;
        if (deltaStart >= 0 && deltaEnd <= 0) {
            className = 'inside';
        } else if (deltaStart < 0) {
            className = 'before';
        } else if (deltaEnd > 0) {
            className =  'after';
        }

        return <span className={className}>Fragment start delta={deltaStart.toFixed(1)}, delta end delta={deltaEnd.toFixed(1)}</span>;
    }

    const handleSplitFragment = () => {
        const newFragment = JSON.parse(JSON.stringify(fragment));
        const oldVal = fragment.endSec;
        newFragment.endSec = parseFloat(videoPlayerPosSecs.toFixed(1));
        onFragmentChanged(newFragment, JSON.parse(JSON.stringify({
            startSec: newFragment.endSec,
            endSec: oldVal,
            pages: newFragment.pages
        })), 'split fragment');
    }

    return (
        <div className='fragmentPosition'>
            <div className='title'>Selected Fragment #{fragmentIdx + 1} ({secsToString(fragment.startSec)} - {secsToString(fragment.endSec)})</div>
            <div className='playerPosition'>{renderFragmentPos()}</div>
            <div className='controls'>
                <div className='button' onClick={handlePlayCurrentFragment}>
                    Play the whole fragment
                </div>
                <div className='group'>
                    <div className='button'  onClick={handleJumpFragmentStart}>
                        Jump to fragment start
                    </div>
                    <div className='button'  onClick={handleJumpFragmentEnd}>
                        Jump to fragment end
                    </div>
                </div>
                <div className='button'  onClick={handleSetFragmentStartToLastFragmentEnd}>
                    Set fragment start at prev. fragment end
                </div>
                <div className='group'>
                    <div className='button'  onClick={hanleSetCurrentTimeAsFragmentStart}>
                        Set as fragment's start time
                    </div>
                    <div className='button'  onClick={hanleSetCurrentTimeAsFragmentEnd}>
                        Set as fragment's end time
                    </div>
                </div>
                {(fragment.startSec < videoPlayerPosSecs && fragment.endSec > videoPlayerPosSecs)
                    ?
                    <div className='button' onClick={handleSplitFragment}>
                        Split fragment at {secsToString(videoPlayerPosSecs)}
                    </div>
                    :'' }
            </div>
        </div>
    );
}

export default FragmentPosition;