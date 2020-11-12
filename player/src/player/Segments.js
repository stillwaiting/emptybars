import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";
import ReactTooltip from 'react-tooltip';
import './Segments.scss';

function Segments({ segments, playInterval, activeSegments, playInput, setPlayInput }) {
    const onPlayInputChange = (e) => {
        setPlayInput(e.target.value);
    }

    const handleClickSegment = (segmentIdx) => {
        onPlayInputChange({
            target: {
                value: (segmentIdx+1) + ':' + (segmentIdx+1)
            }
        });
        playInterval(segments[segmentIdx].startSec, segments[segmentIdx].endSec);
    };

    const handlePlayClick = () => {
        const [startSegmentIdx, startSegmentIdxDelta, stopSegmentIdx, stopSegmentIdxDelta] = parsedPlayInput();
        playInterval(
            segments[startSegmentIdx-1].startSec + startSegmentIdxDelta,
            segments[stopSegmentIdx-1].endSec + stopSegmentIdxDelta
        )
    }

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    const parseSegmentPoint = (str) => {
        str = str.split('-').join('+-');
        const split = str.split('+');
        const number = parseInt(split[0]);
        if (number != split[0]) {
            return [false, false];
        }
        if (number <= 0 || number > segments.length) {
            console.error("Segment " + number + " is out of range. Max=" + segments.length)
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
        const fromSegmentStr = split[0];
        const untilSegmentStr = split[1];
        var [fromSegment, fromSegmentDelta] = parseSegmentPoint(fromSegmentStr);
        if (!fromSegment) {
            return false;
        }
        var [untilSegment, untilSegmentDelta] = parseSegmentPoint(untilSegmentStr);
        if (!untilSegment) {
            return false;
        }
        return [fromSegment, fromSegmentDelta, untilSegment, untilSegmentDelta];
    }

    const isSegmentInPlayInput = (idx) => {
        const parsed = parsedPlayInput();
        if (parsed) {
            const [fromSegment, fromSegmentDelta, untilSegment, untilSegmentDelta] = parsed;
            return (fromSegment <= (idx+1) && untilSegment >= (idx+1));
        }
        return false;
    }

    return (
        <div className='segments'>
            <div>Segments:</div>
            <div className='scrolling'>

                {segments.map(({ startSec, endSec }, key) => (
                    <div
                        tabIndex={0}
                        className={`button ${
                            (activeSegments.indexOf(key) >= 0) ? 'active' : ''
                        } ${isSegmentInPlayInput(key) ? 'inPlayInput' : ''}`}
                        key={key}
                        onClick={handleClickSegment.bind(null, key)}
                    >
                        #{key+1}
                    </div>
                ))}
            </div>
            <div className='playSegmentsSection'>
                Play segments: <input onChange={onPlayInputChange} value={playInput} className={parsedPlayInput() ? '' : 'errorInput'}/>
                <ReactTooltip id='formats'>
                    <div>
                        <div>Allowed formats:
                            <ul className='allowedFormats'>
                             <li><span>1:1</span> - play segment 1 </li>
                             <li><span>1:3</span> - play segments 1, 2 and 3</li>
                             <li><span>1-10s:2+15.2s</span> - play segments 1 and 2, <br />but start 10 seconds earlier and finish 15.2
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

export default Segments;
