import React, { useState } from 'react';
import { secsToString } from "../utils";

import './Fragments.scss';

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

    return (<div className='fragments'>
        <div className='addButton' onClick={handleAddFragmentClick.bind(null)}>
            Add fragment
        </div>

        {fragments.map(({ startSec, endSec }, key) => (
            <div
                className={`fragmentButton ${
                    fragment === key ? 'active' : ''
                }`}
                key={key}
                onClick={handleClickFragment.bind(null, key)}
            >
                <span className='title'>Fragment {key+1}: {secsToString(startSec)} - {secsToString(endSec)}</span>
            </div>
        ))}
    </div>);
}

export default Fragments;
