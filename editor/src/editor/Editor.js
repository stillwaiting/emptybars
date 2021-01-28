import React, { useState, useRef } from 'react';
import PlayerWithNavButtons from './PlayerWithNavButtons';
import SectionPosition from './SectionPosition';

import SectionPages from "./SectionPages";

import './Editor.css';

function Editor({ sections, pageUrls, videoUrl, onDataUpdated }) {
    var [currentSectionIdx, setCurrentSectionIdx] = useState(-1);
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const $player = useRef(null);

    if (currentSectionIdx >= sections.length) {
        currentSectionIdx = -1;
        setCurrentSectionIdx(-1);
    }

    const handleSectionSelected = (sectionIdx, section) => {
        setCurrentSectionIdx(sectionIdx);
        // $player.current.seekToAndStop(section.startSec)
    };

    const onProgressUpdate = (playedSeconds, duration) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
        setVideoDuration(duration);
    };

    const onSectionChanged = (updatedSection, newSection, message) => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections[currentSectionIdx] = updatedSection;
        if (newSection) {
            newSections.splice(currentSectionIdx + 1, 0, newSection);
        }
        onDataUpdated({ sections: newSections, pageUrls, videoUrl }, message);
    };

    const onSectionsChanged = (newSections, message) => {
        onDataUpdated({ sections: newSections, pageUrls, videoUrl }, message);
    }

    const onSectionPageIdxsChanged = (currentSectionSelectedPageIdxs, message) => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections[currentSectionIdx].pageIdxs = currentSectionSelectedPageIdxs;
        onDataUpdated({ sections: newSections, pageUrls, videoUrl }, message);
    };

    const onSectionPageAreasChanged = (currentSectionPageAreas, message) => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections[currentSectionIdx].pageAreas = currentSectionPageAreas;
        onDataUpdated({ sections: newSections, pageUrls, videoUrl }, message);
    };

    const onDeleteSection = () => {
        setCurrentSectionIdx(-1);
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections.splice(currentSectionIdx, 1);
        onDataUpdated({ sections: newSections, pageUrls, videoUrl }, 'section deleted');
    }

    const getPrevSectionEndSec = () => {
        if (currentSectionIdx == 0) {
            return 0;
        }
        return sections[currentSectionIdx-1].endSec;
    }

    const pageUrlsToPageObjectsWithRectangles = () => {
        if (!pageUrls) {
            return;
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
                <div>
                    <PlayerWithNavButtons
                        videoUrl={videoUrl}
                        onProgressUpdate={onProgressUpdate}
                        ref={$player}
                        currentSectionIdx={currentSectionIdx}
                        sections={sections}
                        onSectionSelected={handleSectionSelected}
                        onSectionsChanged={onSectionsChanged}
                    />


                    {currentSectionIdx >= 0
                        ?
                        <div>
                            <SectionPosition
                                $player={$player.current}
                                section={sections[currentSectionIdx]}
                                sectionIdx={currentSectionIdx}
                                onSectionChanged={onSectionChanged}
                                videoPlayerPosSecs={videoPlayerPosSecs}
                                getPrevSectionEndSec={getPrevSectionEndSec}
                                onDeleteSection={onDeleteSection}
                            />
                            <SectionPages
                                pageUrlsWithRectangles={pageUrlsToPageObjectsWithRectangles()}
                                sectionPageIdx={sections[currentSectionIdx].pageIdxs || []}
                                sectionPageAreas={sections[currentSectionIdx].pageAreas || []}
                                onSectionPageIdxsChanges={onSectionPageIdxsChanged}
                                onSectionPageAreasChanged={onSectionPageAreasChanged}
                            />
                        </div>
                        : ''
                    }
            </div>
    );
}

export default Editor;
