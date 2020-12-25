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
    const [videoDuration, setVideoDuration] = useState(0);

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

                    <div style={{height: '50px', overflow: 'hidden', margin: '10px', width:'800px'}}>
                        <div style={{height: '50px', width: (videoDuration * 10) + 'px', marginLeft: '-' + (parseInt(videoPlayerPosSecs * 10) - 100  )  + 'px', position: 'relative'}}>
                            {sections.map((section, idx) =>
                                <div style={{
                                    border: '1px solid #aaa',
                                    height: '25px',
                                    position:'absolute',
                                    backgroundColor: (idx == currentSectionIdx) ? '#ccffcc' : '#eeeeee',
                                    width: parseInt((section.endSec - section.startSec) * 10) + 'px',
                                    textAlign:"center",
                                    overflow: 'hidden',
                                    lineHeight: '25px',
                                    left: (parseInt(section.startSec*10) + 'px'),
                                    top: '10px'
                                }}
                                >
                                    {idx+1}
                                </div>
                            )}
                            <div style={{
                                height: '50px',
                                position:'absolute',
                                backgroundColor: '#0000ff',
                                width: 2,
                                overflow: 'hidden',
                                left: parseInt(videoPlayerPosSecs * 10) + 'px',
                                top: '0px'
                            }}
                             />
                        </div>
                    </div>

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
