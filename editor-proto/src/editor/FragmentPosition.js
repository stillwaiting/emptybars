import React from 'react';
import { secsToString } from "../utils";

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
            return <span className="beforeTime">Before start <span>{deltaBefore}</span></span>
        }
        if (progress > fragment.endSec) {
            return <span className="beforeTime">After END <span>{deltaInAfter}</span></span>
        }

        if (progress >= fragment.startSec && progress <= fragment.endSec) {
            return <span className="inFragment">In fragment. After start {deltaBefore}; before end {deltaInFragment}</span>
        }
    }

    return <div>
        <div>Fragment ({secsToString(fragment.startSec)} - {secsToString(fragment.endSec)})</div>
        <div>{renderFragmentPos()}</div>
        <div className="fragment_controls">
            <div className="play_button" onClick={handlePlayCurrentFragment}>
                Play the whole fragment
            </div>
            <div className="play_button"  onClick={handleJumpFragmentStart}>
                Jump to fragment start
            </div>
            <div className="play_button"  onClick={handleJumpFragmentEnd}>
                Jump to fragment end
            </div>
            <div className="play_button"  onClick={hanleSetCurrentTimeAsFragmentStart}>
                Set current time as start time of the fragment
            </div>
            <div className="play_button"  onClick={hanleSetCurrentTimeAsFragmentEnd}>
                Set current time as end time of the fragment
            </div>
        </div>
    </div>;
}

export default FragmentPosition;