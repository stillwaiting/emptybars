import React, { useState, useRef } from 'react';
import PlayerWithNavButtons from './PlayerWithNavButtons';
import SectionPosition from './SectionPosition';
import Sections from './Sections';

import Pages from "./Pages";
import SectionPages from "./SectionPages";

import './Editor.css';

function Editor({ sections, pages, videoUrl, onDataUpdated }) {
    var [currentSectionIdx, setCurrentSectionIdx] = useState(-1);
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);

    const $player = useRef(null);

    if (currentSectionIdx >= sections.length) {
        currentSectionIdx = -1;
        setCurrentSectionIdx(-1);
    }

    const handleSectionSelected = (sectionIdx, section) => {
        setCurrentSectionIdx(sectionIdx);
        $player.current.seekToAndStop(section.startSec)
    };

    const handleOnPagesUpdated = (pages, message) => {
        onDataUpdated({ sections, pages, videoUrl }, message);
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
    };

    const onSectionChanged = (updatedSection, newSection, message) => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections[currentSectionIdx] = updatedSection;
        if (newSection) {
            newSections.splice(currentSectionIdx + 1, 0, newSection);
        }
        onDataUpdated({ sections: newSections, pages, videoUrl }, message);
    };

    const onSectionsChanged = (newSections, message) => {
        onDataUpdated({ sections: newSections, pages, videoUrl }, message);
    }

    const onSectionPagesChanged = (currentSectionSelectedPages, message) => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections[currentSectionIdx].pages = currentSectionSelectedPages;
        onDataUpdated({ sections: newSections, pages, videoUrl }, message);
    };

    const onSectionPageAreasChanged = (currentSectionPageAreas, message) => {
        const newSections = JSON.parse(JSON.stringify(sections));
        newSections[currentSectionIdx].pageAreas = currentSectionPageAreas;
        onDataUpdated({ sections: newSections, pages, videoUrl }, message);
    };

    const getPrevSectionEndSec = () => {
        if (currentSectionIdx == 0) {
            return 0;
        }
        return sections[currentSectionIdx-1].endSec;
    }

    return (
                <div>
                    <Sections sections={sections} onSectionSelected={handleSectionSelected} onSectionsChanged={onSectionsChanged} />
                    <PlayerWithNavButtons
                        videoUrl={videoUrl}
                        onProgressUpdate={onProgressUpdate}
                        ref={$player}
                        sectionStartSec={currentSectionIdx >= 0 ? sections[currentSectionIdx].startSec : -1}
                        sectionEndSec={currentSectionIdx >= 0 ? sections[currentSectionIdx].endSec : -1}
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
                            />
                            <SectionPages
                                pages={pages || []}
                                sectionPages={sections[currentSectionIdx].pages || []}
                                sectionPageAreas={sections[currentSectionIdx].pageAreas || {}}
                                onSectionPagesChanges={onSectionPagesChanged}
                                onSectionPageAreasChanged={onSectionPageAreasChanged}
                            />
                        </div>
                        : ''
                    }


                {/*<Pages pages={pages || []} onPagesUpdated={handleOnPagesUpdated} />*/}

            </div>
    );
}

export default Editor;
