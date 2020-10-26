import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";

import './Fragments.scss';

function Fragments({ fragments, playInterval, activeFragments }) {
    const [playInput, setPlayInput] = useState("");

    const onPlayInputChange = (e) => {
        setPlayInput(e.target.value);
    }

    const handleClickFragment = (fragmentIdx) => {
        onPlayInputChange({
            target: {
                value: fragmentIdx + ':' + fragmentIdx
            }
        });
        playInterval(fragments[fragmentIdx].startSec, fragments[fragmentIdx].endSec);
    };

    const handlePlayClick = () => {
        const [startFragmentIdx, startFragmentIdxDelta, stopFragmentIdx, stopFragmentIdxDelta] = parsePlayInput(playInput);
        playInterval(
            fragments[startFragmentIdx].startSec + startFragmentIdxDelta,
            fragments[stopFragmentIdx].startSec + stopFragmentIdxDelta
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

    const parsePlayInput = (playInput) => {
        const split = playInput.split(':');
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

    return (
        <div className='fragments'>
            <div>Fragments:</div>
            <div className='scrolling'>

                {fragments.map(({ startSec, endSec }, key) => (
                    <div
                        className={`button ${
                            (activeFragments.indexOf(key) >= 0) ? 'active' : ''
                        }`}
                        key={key}
                        onClick={handleClickFragment.bind(null, key)}
                    >
                        #{key+1}
                    </div>
                ))}
            </div>
            <div>Play fragments: <input onChange={onPlayInputChange} value={playInput}/></div>
            {!parsePlayInput(playInput)
                ? <div>
                    <div className="error">Invalid format!</div>
                    <div>Allowed formats: <br/>
                        <span>1:1</span> - Play fragment 1 <br/>
                        <span>1:3</span> - Play fragments 1, 2 and 3<br/>
                        <span>1-10s:2+15.2s</span> - Play fragments 1 and 2; start 10 seconds earlier and finish 15.2
                        seconds later
                    </div>
                </div>
                : <button onClick={handlePlayClick}>Play</button>
            }
         </div>);
}

export default Fragments;
