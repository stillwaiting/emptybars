import React, { useState, useRef } from 'react';
import PlayerWithNavButtons from '../PlayerWithNavButtons';
import SegmentPosition from './SegmentPosition';
import Segments from './Segments';

import Pages from "./Pages";
import SegmentPages from "./SegmentPages";

import './Editor.css';

function Editor({ segments, pages, videoUrl, onDataUpdated }) {
    var [currentSegmentIdx, setCurrentSegmentIdx] = useState(-1);
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);

    const $player = useRef(null);

    if (currentSegmentIdx >= segments.length) {
        currentSegmentIdx = -1;
        setCurrentSegmentIdx(-1);
    }

    const handleSegmentSelected = (segmentIdx, segment) => {
        setCurrentSegmentIdx(segmentIdx);
        $player.current.seekToAndStop(segment.startSec)
    };

    const handleOnPagesUpdated = (pages, message) => {
        onDataUpdated({ segments, pages, videoUrl }, message);
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
    };

    const onSegmentChanged = (updatedSegment, newSegment, message) => {
        const newSegments = JSON.parse(JSON.stringify(segments));
        newSegments[currentSegmentIdx] = updatedSegment;
        if (newSegment) {
            newSegments.splice(currentSegmentIdx + 1, 0, newSegment);
        }
        onDataUpdated({ segments: newSegments, pages, videoUrl }, message);
    };

    const onSegmentsChanged = (newSegments, message) => {
        onDataUpdated({ segments: newSegments, pages, videoUrl }, message);
    }

    const onSegmentPagesChanged = (currentSegmentSelectedPages, message) => {
        const newSegments = JSON.parse(JSON.stringify(segments));
        newSegments[currentSegmentIdx].pages = currentSegmentSelectedPages;
        onDataUpdated({ segments: newSegments, pages, videoUrl }, message);
    };

    const onSegmentPageAreasChanged = (currentSegmentPageAreas, message) => {
        const newSegments = JSON.parse(JSON.stringify(segments));
        newSegments[currentSegmentIdx].pageAreas = currentSegmentPageAreas;
        onDataUpdated({ segments: newSegments, pages, videoUrl }, message);
    };

    const getPrevSegmentEndSec = () => {
        if (currentSegmentIdx == 0) {
            return 0;
        }
        return segments[currentSegmentIdx-1].endSec;
    }

    return (
            <div className='editor'>
                <div>
                    <PlayerWithNavButtons videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} />

                    {currentSegmentIdx >= 0
                        ?
                        <div>
                            <SegmentPosition
                                $player={$player.current}
                                segment={segments[currentSegmentIdx]}
                                segmentIdx={currentSegmentIdx}
                                onSegmentChanged={onSegmentChanged}
                                videoPlayerPosSecs={videoPlayerPosSecs}
                                getPrevSegmentEndSec={getPrevSegmentEndSec}
                            />
                            <SegmentPages
                                pages={pages || []}
                                segmentPages={segments[currentSegmentIdx].pages || []}
                                segmentPageAreas={segments[currentSegmentIdx].pageAreas || {}}
                                onSegmentPagesChanges={onSegmentPagesChanged}
                                onSegmentPageAreasChanged={onSegmentPageAreasChanged}
                            />
                        </div>
                        : ''
                    }

                </div>

                <Segments segments={segments} onSegmentSelected={handleSegmentSelected} onSegmentsChanged={onSegmentsChanged} />

                {/*<Pages pages={pages || []} onPagesUpdated={handleOnPagesUpdated} />*/}

            </div>
    );
}

export default Editor;
