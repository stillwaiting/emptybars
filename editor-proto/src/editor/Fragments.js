import React, { useState } from 'react';
import { secsToString } from "../utils";

import './Fragments.scss';

function Fragments({ fragments, onFragmentSelected, onFragmentsChanged}) {
    var [selectedFragmentIdx, setSelectedFragmentIdx] = useState(-1);

    const handleClickFragment = (fragmentIdx) => {
        setSelectedFragmentIdx(fragmentIdx);
        onFragmentSelected(fragmentIdx);
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
        // TODO: scroll to it
        handleClickFragment(fragments.length - 1);
        onFragmentsChanged(JSON.parse(JSON.stringify(fragments)));
    }

    return (<div className='fragments'>
        <div className='addButton' onClick={handleAddFragmentClick.bind(null)}>
            Add fragment
        </div>

        {fragments.map(({ startSec, endSec }, key) => (
            <div
                className={`button ${
                    selectedFragmentIdx === key ? 'active' : ''
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
