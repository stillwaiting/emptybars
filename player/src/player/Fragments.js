import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";

import './Fragments.scss';

function Fragments({ fragments, onFragmentSelected: onFragmentClicked, activeFragments }) {
    const handleClickFragment = (fragmentIdx) => {
        onFragmentClicked(fragmentIdx);
    };

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
         </div>);
}

export default Fragments;
