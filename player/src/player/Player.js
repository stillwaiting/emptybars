import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Sections from './Sections';

import SectionPages from "./SectionPages";

import './Player.scss';

function Player({ sections, images, pages, videoUrl }) {
    const [activeSections, setActiveSections] = useState([]);
    const [initialised, setInitialised] = useState(0)
    const [skipScrollingFromTime, setSkipScrollingFromTime] = useState(false)
    const [refreshSkipScrollingOnPlay, setRefreshSkipScrollingOnPlaying] = useState(false)
    const [playInput, setPlayInput] = useState("");

    const $player = useRef(null);

    const handlePlayInterval = (from, until) => {
        $player.current.playSection(from, until)
    };

    const updateActiveSections = (playedSeconds) => {
        var newActiveSections = [];
        for (var idx = 0; idx <sections.length; idx++ ) {
            const section = sections[idx];
            // The intervals often overlap and the videos are paused at the start of the interval. Without this
            // shortcut the paused video at the start of a segment usually shows 2 segments on the sheets, not good
            if (Math.abs(section.startSec - playedSeconds) < 0.1) {
                setActiveSections([idx]);
                return;
            }
            if (section.startSec <= playedSeconds && section.endSec >= playedSeconds) {
                newActiveSections.push(idx);
            }
        }
        setActiveSections(newActiveSections);
    }

    const onProgressUpdate = (playedSeconds) => {
        if (playedSeconds > 0 && !initialised) {
            setInitialised(true)
            $player.current.playSection(sections[0].startSec, sections[sections.length-1].endSec);
            return;
        }
        if (!initialised) {
            return;
        }
        if (refreshSkipScrollingOnPlay) {
            setSkipScrollingFromTime(new Date().getTime());
            setRefreshSkipScrollingOnPlaying(false);
        }
        updateActiveSections(playedSeconds);
        if (playedSeconds < sections[0].startSec) {
            $player.current.stop(sections[0].startSec);
        }
        if (playedSeconds > sections[sections.length - 1].endSec) {
            $player.current.stop(sections[sections.length - 1].endSec);
        }
    };

    const onStop = () => {
        setSkipScrollingFromTime(false);
        setRefreshSkipScrollingOnPlaying(false);
    }

    const getActivePageAreas = () => {
        var areas = {};
        activeSections.forEach(sectionIdx => {
            for (const pageId in sections[sectionIdx].pageAreas) {
                const pageAreas = sections[sectionIdx].pageAreas[pageId];
                if (areas[pageId]) {
                    areas[pageId] = areas[pageId].concat(pageAreas)
                } else {
                    areas[pageId] = pageAreas;
                }
            }
        });
        return areas;
    }

    const sectionContainsPoint = (pageAreas, posX, posY) => {
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
        for (var sectionIdx = 0 ; sectionIdx < sections.length; sectionIdx ++) {
            const section = sections[sectionIdx];
            if (sectionContainsPoint(section.pageAreas[pageUid] || [], pageX, pageY)) {
                setPlayInput((sectionIdx + 1) + ':' + (sectionIdx + 1));
                setRefreshSkipScrollingOnPlaying(true);
                setSkipScrollingFromTime(new Date().getTime());
                updateActiveSections(section.startSec);
                handlePlayInterval(section.startSec, section.endSec);
                return;
            }
        }
    }

    const youtubeLink = `${videoUrl}?t=${sections.length > 0 ? sections[0].startSec : '0'}`;

    return (
            <div className={initialised ? 'player' : 'player notInitialised'}>
                <div className='sectionPagesWrapper'>
                    <SectionPages
                        images={images}
                        pages={pages || []}
                        onPageClicked={onPageClicked}
                        skipScrollingFromTime={skipScrollingFromTime}
                        sectionPageAreas={getActivePageAreas()}
                        />
                </div>

                <div className='playerAndSections'>
                    <Sections sections={sections} playInterval={handlePlayInterval} activeSections={activeSections} playInput={playInput} setPlayInput={setPlayInput}/>
                    <ReactPlayerWrapper videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} onStop={onStop} />
                    <br />
                    {initialised ? <div><a href={youtubeLink} target="_blank">Watch on YouTube</a></div> : ''}
                </div>

            </div>
    );
}

export default Player;
