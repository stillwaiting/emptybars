import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Sections from './Sections';

import SectionPages from "./SectionPages";
import { AnchorManager } from 'emptybars-common-ts/lib/anchormanager'

import './Player.scss';

function Player({ sections, images, pageUrls, videoUrl }) {
    const [activeSections, setActiveSections] = useState([]);
    const [initialised, setInitialised] = useState(0)
    const [skipScrollingFromTime, setSkipScrollingFromTime] = useState(false)
    const [refreshSkipScrollingOnPlay, setRefreshSkipScrollingOnPlaying] = useState(false)
    const [playInput, setPlayInput] = useState("");

    const [anchorManager] = useState(new AnchorManager());


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

        const startSecsSorted = sections.map(section => parseFloat(section.startSec));
        startSecsSorted.sort(function(a, b) {
            return a - b;
          });

        const endSecsSorted = sections.map(section => parseFloat(section.endSec));
        endSecsSorted.sort(function(a, b) {
            return a - b;
          });

        if (playedSeconds < startSecsSorted[0]) {
            $player.current.stop(startSecsSorted[0]);
        }
        if (playedSeconds > endSecsSorted[endSecsSorted.length - 1]) {
            $player.current.stop(endSecsSorted[endSecsSorted.length - 1]);
        }
    };

    const onStop = () => {
        setSkipScrollingFromTime(false);
        setRefreshSkipScrollingOnPlaying(false);
    }

    const getActivePageAreas = () => {
        var areas = {};
        activeSections.forEach(sectionIdx => {
            sections[sectionIdx].pageAreas.forEach(pageAreas => {
                if (areas[pageAreas.pageIdx]) {
                    areas[pageAreas.pageIdx] = areas[pageAreas.pageIdx].concat(pageAreas.areas)
                } else {
                    areas[pageAreas.pageIdx] = pageAreas.areas;
                }
            });
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

    const onPageClicked = (pageIdx, pageX, pageY) => {
        for (var sectionIdx = 0 ; sectionIdx < sections.length; sectionIdx ++) {
            const section = sections[sectionIdx];
            const sectionPageAreas = section.pageAreas.find(pageArea => pageArea.pageIdx == pageIdx);
            if (sectionContainsPoint((sectionPageAreas || {areas: []}).areas, pageX, pageY)) {
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

    const pageUrlsToPageObjectsWithRectangles = () => {
        if (!pageUrls || pageUrls.length == 0) {
            return [];
        }
        const newPages = pageUrls.map(pageUrl => ({url: pageUrl, rectangles: []}));

        sections.forEach(section => {
            (section.pageAreas || []).forEach((pageAreas) => {
                newPages[pageAreas.pageIdx].rectangles.push(...pageAreas.areas);
            });
        });
        return newPages;
    }

    return (
            <div className={initialised ? 'player' : 'player notInitialised'}>
                <div className='sectionPagesWrapper'>
                    <SectionPages
                        images={images}
                        pages={pageUrlsToPageObjectsWithRectangles()}
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
