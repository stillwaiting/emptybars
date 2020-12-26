import React, {useState, useRef, useEffect} from 'react';
import {secsToString} from "emptybars-common/utils";

import './Sections.scss';

function SectionsTimeline({sections, videoDuration, videoPlayerPosSecs, currentSectionIdx, onSectionSelected, onSectionsChanged}) {
    const lastCreatedSectionRef = useRef(null);

    const handleClickSection = (sectionIdx, section) => {
        onSectionSelected(sectionIdx, section);
    };

    const handleAddSectionClick = () => {
        const newSections = JSON.parse(JSON.stringify(sections));
        if (newSections.length > 0) {
            newSections.push({
                startSec: sections[sections.length - 1].endSec,
                endSec: sections[sections.length - 1].endSec + 10
            });
        } else {
            newSections.push({
                startSec: 0,
                endSec: 10
            });
        }
        onSectionsChanged(newSections, "add section");
        handleClickSection(newSections.length - 1, newSections[newSections.length - 1]);
    }

    return (
        <div className='sections'>
                <div className="addButtonWrapper">
                    <div className='addButton' onClick={handleAddSectionClick.bind(null)}>
                        Add section
                    </div>
                </div>

            <div style={{height: '50px', overflow: 'hidden', margin: '10px', width:'800px'}}>
                <div style={{height: '50px', width: (videoDuration * 10) + 'px', marginLeft: '-' + (parseInt(videoPlayerPosSecs * 10) - 100  )  + 'px', position: 'relative'}}>
                    {sections.map((section, idx) =>
                        <div style={{
                            border: '1px solid #aaa',
                            height: '25px',
                            position:'absolute',
                            backgroundColor: (idx == currentSectionIdx) ? '#ccffcc' : '#eeeeee',
                            width: parseInt((section.endSec - section.startSec) * 10) + 'px',
                            cursor: 'pointer',
                            textAlign:"center",
                            overflow: 'hidden',
                            lineHeight: '25px',
                            left: (parseInt(section.startSec*10) + 'px'),
                            top: '10px'
                        }}
                             onClick={handleClickSection.bind(null, idx, sections[idx])}
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

        </div>);
}

export default SectionsTimeline;
