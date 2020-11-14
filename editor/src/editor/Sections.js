import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";

import './Sections.scss';

function Sections({ sections, onSectionSelected, onSectionsChanged}) {
    var [selectedSectionIdx, setSelectedSectionIdx] = useState(-1);
    var [lastCreatedSectionIdx, setLastCreatedSectionIdx] = useState(-1);
    const lastCreatedSectionRef = useRef(null);

    const handleClickSection = (sectionIdx, section) => {
        setSelectedSectionIdx(sectionIdx);
        console.log(section);
        onSectionSelected(sectionIdx, section);
    };

    useEffect(() => {
        if (lastCreatedSectionRef.current && lastCreatedSectionIdx >= 0) {
            lastCreatedSectionRef.current.scrollIntoView();
            setLastCreatedSectionIdx(-1);
        }
    });

    const handleAddSectionClick = () => {
        const newSections = JSON.parse(JSON.stringify(sections));
        if (newSections.length > 0) {
            newSections.push({
                startSec: sections[sections.length-1].endSec,
                endSec: sections[sections.length-1].endSec + 10
            });
        } else {
            newSections.push({
                startSec: 0,
                endSec: 10
            });
        }
        onSectionsChanged(newSections, "add section");
        setLastCreatedSectionIdx(newSections.length - 1);
        handleClickSection(newSections.length - 1, newSections[newSections.length-1]);
    }

    return (
        <div className='sections'>
            <div className='scrolling'>
                <div className='addButton' onClick={handleAddSectionClick.bind(null)}>
                    Add section
                </div>

                {sections.map(({ startSec, endSec }, key) => (
                    <div
                        className={`button ${
                            selectedSectionIdx === key ? 'active' : ''
                        }`}
                        key={key}
                        onClick={handleClickSection.bind(null, key, sections[key])}
                        ref={(key == lastCreatedSectionIdx) ? lastCreatedSectionRef : null}
                    >
                        Section {key+1}: {secsToString(startSec)} - {secsToString(endSec)}
                    </div>
                ))}
            </div>
         </div>);
}

export default Sections;
