import React from 'react';
import { secsToString } from "emptybars-common/utils";

import './SegmentPosition.scss';

function SegmentPosition({ $player, segment, segmentIdx, videoPlayerPosSecs, onSegmentChanged: onSegmentChanged, getPrevSegmentEndSec: getPrevSegmentEndSec}) {
    const handlePlayCurrentSegment = () => {
        $player.playSegment(segment.startSec, segment.endSec, 'STAY_AT_START');
    }

    const handleJumpSegmentStart = () => {
        $player.seekToAndStop(segment.startSec);
    }

    const handleJumpSegmentEnd = () => {
        $player.seekToAndStop(segment.endSec);
    }

    const hanleSetCurrentTimeAsSegmentStart = () => {
        const newSegment = JSON.parse(JSON.stringify(segment));
        newSegment.startSec = parseFloat(videoPlayerPosSecs.toFixed(1));
        onSegmentChanged(newSegment, undefined, "update segment start time");
    }

    const handleSetSegmentStartToLastSegmentEnd = () => {
        const newSegment = JSON.parse(JSON.stringify(segment));
        newSegment.startSec = getPrevSegmentEndSec();
        onSegmentChanged(newSegment, undefined, "update segment start time");
    }

    const hanleSetCurrentTimeAsSegmentEnd = () => {
        const newSegment = JSON.parse(JSON.stringify(segment));
        newSegment.endSec = parseFloat(videoPlayerPosSecs.toFixed(1));
        onSegmentChanged(newSegment, undefined, 'update segment end time');
    }

    const renderSegmentPos = () => {
        const deltaStart = (videoPlayerPosSecs - segment.startSec);
        const deltaEnd = (videoPlayerPosSecs - segment.endSec);

        var className;
        if (deltaStart >= 0 && deltaEnd <= 0) {
            className = 'inside';
        } else if (deltaStart < 0) {
            className = 'before';
        } else if (deltaEnd > 0) {
            className =  'after';
        }

        return <span className={className}>Segment start delta={deltaStart.toFixed(1)}, delta end delta={deltaEnd.toFixed(1)}</span>;
    }

    const handleSplitSegment = () => {
        const newSegment = JSON.parse(JSON.stringify(segment));
        const oldVal = segment.endSec;
        newSegment.endSec = parseFloat(videoPlayerPosSecs.toFixed(1));
        onSegmentChanged(newSegment, JSON.parse(JSON.stringify({
            startSec: newSegment.endSec,
            endSec: oldVal,
            pages: newSegment.pages
        })), 'split segment');
    }

    return (
        <div className='segmentPosition'>
            <div className='title'>Selected Segment #{segmentIdx + 1} ({secsToString(segment.startSec)} - {secsToString(segment.endSec)})</div>
            <div className='playerPosition'>{renderSegmentPos()}</div>
            <div className='controls'>
                <div className='button' onClick={handlePlayCurrentSegment}>
                    Play the whole segment
                </div>
                <div className='group'>
                    <div className='button'  onClick={handleJumpSegmentStart}>
                        Jump to segment start
                    </div>
                    <div className='button'  onClick={handleJumpSegmentEnd}>
                        Jump to segment end
                    </div>
                </div>
                <div className='button'  onClick={handleSetSegmentStartToLastSegmentEnd}>
                    Set segment start at prev. segment end
                </div>
                <div className='group'>
                    <div className='button'  onClick={hanleSetCurrentTimeAsSegmentStart}>
                        Set as segment's start time
                    </div>
                    <div className='button'  onClick={hanleSetCurrentTimeAsSegmentEnd}>
                        Set as segment's end time
                    </div>
                </div>
                {(segment.startSec < videoPlayerPosSecs && segment.endSec > videoPlayerPosSecs)
                    ?
                    <div className='button' onClick={handleSplitSegment}>
                        Split segment at {secsToString(videoPlayerPosSecs)}
                    </div>
                    :'' }
            </div>
        </div>
    );
}

export default SegmentPosition;