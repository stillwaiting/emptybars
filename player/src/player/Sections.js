import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";
import ReactTooltip from 'react-tooltip';
import './Sections.scss';

function Sections({ sections, playInterval, activeSections, playInput, setPlayInput }) {
    const onPlayInputChange = (e) => {
        setPlayInput(e.target.value);
    }

    const handleClickSection = (sectionIdx) => {
        onPlayInputChange({
            target: {
                value: (sectionIdx+1) + ':' + (sectionIdx+1)
            }
        });
        playInterval(sections[sectionIdx].startSec, sections[sectionIdx].endSec);
    };

    const handlePlayClick = () => {
        const [startSectionIdx, startSectionIdxDelta, stopSectionIdx, stopSectionIdxDelta] = parsedPlayInput();
        playInterval(
            sections[startSectionIdx-1].startSec + startSectionIdxDelta,
            sections[stopSectionIdx-1].endSec + stopSectionIdxDelta
        )
    }

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    const parseSectionPoint = (str) => {
        str = str.split('-').join('+-');
        const split = str.split('+');
        const number = parseInt(split[0]);
        if (number != split[0]) {
            return [false, false];
        }
        if (number <= 0 || number > sections.length) {
            console.error("Section " + number + " is out of range. Max=" + sections.length)
            return [false, false];
        }
        if (split.length == 1) {
            return [number, 0];
        } else if (split.length == 2) {
            const secondsShift = split[1].split('s').join('').trim()
            if (!isNumeric(secondsShift)) {
                console.error(secondsShift + " is not a number");
                return [false, false];
            }
            return [number, parseFloat(secondsShift)];
        } else {
            return [false, false];
        }
    }

    const parsedPlayInput = () => {
        const split = playInput.replace(' ', '').split(':');
        if (split.length != 2) {
            return false;
        }
        const fromSectionStr = split[0];
        const untilSectionStr = split[1];
        var [fromSection, fromSectionDelta] = parseSectionPoint(fromSectionStr);
        if (!fromSection) {
            return false;
        }
        var [untilSection, untilSectionDelta] = parseSectionPoint(untilSectionStr);
        if (!untilSection) {
            return false;
        }
        return [fromSection, fromSectionDelta, untilSection, untilSectionDelta];
    }

    const isSectionInPlayInput = (idx) => {
        const parsed = parsedPlayInput();
        if (parsed) {
            const [fromSection, fromSectionDelta, untilSection, untilSectionDelta] = parsed;
            return (fromSection <= (idx+1) && untilSection >= (idx+1));
        }
        return false;
    }

    return (
        <div className='sections'>
            <div>Choose a section to play:</div>
            <div className='scrolling'>

                {sections.map(({ startSec, endSec }, key) => (
                    <div
                        tabIndex={0}
                        className={`button ${
                            (activeSections.indexOf(key) >= 0) ? 'active' : ''
                        } ${isSectionInPlayInput(key) ? 'inPlayInput' : ''}`}
                        key={key}
                        onClick={handleClickSection.bind(null, key)}
                    >
                        #{key+1}
                    </div>
                ))}
            </div>
            <div className='playSectionsSection'>
                Sections to play: <input onChange={onPlayInputChange} value={playInput} className={parsedPlayInput() ? '' : 'errorInput'}/>
                <ReactTooltip id='formats'>
                    <div>
                        <div>Allowed formats:
                            <ul className='allowedFormats'>
                             <li><span>1:1</span> - play section 1 </li>
                             <li><span>1:3</span> - play sections 1, 2 and 3</li>
                             <li><span>1-10s:2+15.2s</span> - play sections 1 and 2, <br />but start 10 seconds earlier and finish 15.2
                            seconds later</li>
                            </ul>
                        </div>
                    </div>
                </ReactTooltip>
                &nbsp; <img src='https://images2.imgbox.com/02/01/VzjEL9yb_o.png?download=true' align='center' data-tip data-for='formats' />
            </div>
            {!parsedPlayInput()
                ? ''
                : <button onClick={handlePlayClick}>Play</button>
            }
         </div>);
}

export default Sections;
