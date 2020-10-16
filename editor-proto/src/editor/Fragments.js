import React, { useState } from 'react';
import { secsToString } from "../utils";

function Fragments({ fragments, onFragmentSelected, onFragmentsChanged}) {
    var [fragment, setFragment] = useState(-1);

    const handleClickFragment = (key) => {
        setFragment(key);
        onFragmentSelected(key);
    };

    const handleAddFragmentClick = () => {
        if (fragments.length > 0) {
            fragments.push({
                startSec: fragments[fragments.length-1].endSec,
                endSec: fragments[fragments.length-1].endSec + 10
            });
        } else {
            fragments.push({
                startSec: 0,
                endSec: 10
            });
        }
        onFragmentsChanged(JSON.parse(JSON.stringify(fragments)));
    }

    return (<div>
        <div onClick={handleAddFragmentClick.bind(null)} className='player__fragment'>
            <span className='player__fragment-title'>Add fragment</span>
        </div>

        {fragments.map(({ startSec, endSec }, key) => (
            <div
                key={key}
                onClick={handleClickFragment.bind(null, key)}
                className={`player__fragment ${
                    fragment === key ? 'player__fragment-active' : ''
                }`}>
                <span className='player__fragment-title'>Fragment {key+1}: {secsToString(startSec)} - {secsToString(endSec)}</span>
            </div>
        ))}
    </div>);
}

export default Fragments;
