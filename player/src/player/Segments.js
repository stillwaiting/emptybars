import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";
import ReactTooltip from 'react-tooltip';
import './Segments.scss';

function Segments({ fragments, playInterval, activeFragments, playInput, setPlayInput }) {
    const onPlayInputChange = (e) => {
        setPlayInput(e.target.value);
    }

    const handleClickFragment = (fragmentIdx) => {
        onPlayInputChange({
            target: {
                value: (fragmentIdx+1) + ':' + (fragmentIdx+1)
            }
        });
        playInterval(fragments[fragmentIdx].startSec, fragments[fragmentIdx].endSec);
    };

    const handlePlayClick = () => {
        const [startFragmentIdx, startFragmentIdxDelta, stopFragmentIdx, stopFragmentIdxDelta] = parsedPlayInput();
        playInterval(
            fragments[startFragmentIdx-1].startSec + startFragmentIdxDelta,
            fragments[stopFragmentIdx-1].endSec + stopFragmentIdxDelta
        )
    }

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    const parseFragmentPoint = (str) => {
        str = str.split('-').join('+-');
        const split = str.split('+');
        const number = parseInt(split[0]);
        if (number != split[0]) {
            return [false, false];
        }
        if (number <= 0 || number > fragments.length) {
            console.error("Fragment " + number + " is out of range. Max=" + fragments.length)
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
        const fromFragmentStr = split[0];
        const untilFragmentStr = split[1];
        var [fromFragment, fromFragmentDelta] = parseFragmentPoint(fromFragmentStr);
        if (!fromFragment) {
            return false;
        }
        var [untilFragment, untilFragmentDelta] = parseFragmentPoint(untilFragmentStr);
        if (!untilFragment) {
            return false;
        }
        return [fromFragment, fromFragmentDelta, untilFragment, untilFragmentDelta];
    }

    const isFragmentInPlayInput = (idx) => {
        const parsed = parsedPlayInput();
        if (parsed) {
            const [fromFragment, fromFragmentDelta, untilFragment, untilFragmentDelta] = parsed;
            return (fromFragment <= (idx+1) && untilFragment >= (idx+1));
        }
        return false;
    }

    return (
        <div className='fragments'>
            <div>Fragments:</div>
            <div className='scrolling'>

                {fragments.map(({ startSec, endSec }, key) => (
                    <div
                        tabIndex={0}
                        className={`button ${
                            (activeFragments.indexOf(key) >= 0) ? 'active' : ''
                        } ${isFragmentInPlayInput(key) ? 'inPlayInput' : ''}`}
                        key={key}
                        onClick={handleClickFragment.bind(null, key)}
                    >
                        #{key+1}
                    </div>
                ))}
            </div>
            <div className='playFragmentsSection'>
                Play fragments: <input onChange={onPlayInputChange} value={playInput} className={parsedPlayInput() ? '' : 'errorInput'}/>
                <ReactTooltip id='formats'>
                    <div>
                        <div>Allowed formats:
                            <ul className='allowedFormats'>
                             <li><span>1:1</span> - play fragment 1 </li>
                             <li><span>1:3</span> - play fragments 1, 2 and 3</li>
                             <li><span>1-10s:2+15.2s</span> - play fragments 1 and 2, <br />but start 10 seconds earlier and finish 15.2
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
