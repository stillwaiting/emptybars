import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Segments from './Segments';

import SegmentPages from "./SegmentPages";

import './Player.scss';

function Player({ segments, images, pages, videoUrl }) {
    const [activeSegments, setActiveSegments] = useState([]);
    const [initialised, setInitialised] = useState(false)
    const [skipScrollingFromTime, setSkipScrollingFromTime] = useState(false)
    const [refreshSkipScrollingOnPlay, setRefreshSkipScrollingOnPlaying] = useState(false)
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);
    const [playInput, setPlayInput] = useState("");

    const $player = useRef(null);

    const handlePlayInterval = (from, until) => {
        $player.current.playSegment(from, until)
    };

    const updateActiveSegments = (playedSeconds) => {
        var newActiveSegments = [];
        segments.forEach((segment, idx) => {
            if (segment.startSec <= playedSeconds && segment.endSec >= playedSeconds) {
                newActiveSegments.push(idx);
            }
        });
        setActiveSegments(newActiveSegments);
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
        if (refreshSkipScrollingOnPlay) {
            setSkipScrollingFromTime(new Date().getTime());
            setRefreshSkipScrollingOnPlaying(false);
        }
        updateActiveSegments(playedSeconds);
    };

    const onPlay = () => {
        setInitialised(true)
    }

    const onStop = () => {
        setSkipScrollingFromTime(false);
        setRefreshSkipScrollingOnPlaying(false);
    }

    const getActivePageAreas = () => {
        var areas = {};
        activeSegments.forEach(segmentIdx => {
            for (const pageId in segments[segmentIdx].pageAreas) {
                const pageAreas = segments[segmentIdx].pageAreas[pageId];
                if (areas[pageId]) {
                    areas[pageId] = areas[pageId].concat(pageAreas)
                } else {
                    areas[pageId] = pageAreas;
                }
            }
        });
        return areas;
    }

    const segmentContainsPoint = (pageAreas, posX, posY) => {
        for (var areaIdx = 0; areaIdx < pageAreas.length; areaIdx++) {
            const {x, y, width, height} = pageAreas[areaIdx];
            const x2 = x + width;
            const y2 = y + height;
            if (posX > Math.min(x, x2) && posX < Math.max(x, x2) && posY > Math.min(y, y2) && posY < Math.max(y, y2)) {
                return true;
            }
        }
        return false;
    }

    const onPageClicked = (pageUid, pageX, pageY) => {
        for (var segmentIdx = 0 ; segmentIdx < segments.length; segmentIdx ++) {
            const segment = segments[segmentIdx];
            if (segmentContainsPoint(segment.pageAreas[pageUid] || [], pageX, pageY)) {
                setPlayInput((segmentIdx + 1) + ':' + (segmentIdx + 1));
                setRefreshSkipScrollingOnPlaying(true);
                setSkipScrollingFromTime(new Date().getTime());
                updateActiveSegments(segment.startSec);
                handlePlayInterval(segment.startSec, segment.endSec);
                return;
            }
        }
    }

    return (
            <div className={initialised ? 'player' : 'player notInitialised'}>
                <div className='segmentPagesWrapper'>
                    <SegmentPages
                        images={images}
                        pages={pages || []}
                        onPageClicked={onPageClicked}
                        skipScrollingFromTime={skipScrollingFromTime}
                        segmentPageAreas={getActivePageAreas()}
                        />
                </div>

                <div className='playerAndSegments'>
                    <ReactPlayerWrapper videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} onPlay={onPlay} onStop={onStop} />
                    <Segments segments={segments} playInterval={handlePlayInterval} activeSegments={activeSegments} playInput={playInput} setPlayInput={setPlayInput}/>
                </div>

            </div>
    );
}

export default Player;
