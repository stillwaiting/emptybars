import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";

import './Fragments.scss';

function Fragments({ fragments, onFragmentSelected }) {
    var [selectedFragmentIdx, setSelectedFragmentIdx] = useState(-1);
    var [lastCreatedFragmentIdx, setLastCreatedFragmentIdx] = useState(-1);
    const lastCreatedFragmentRef = useRef(null);

    const handleClickFragment = (fragmentIdx) => {
        setSelectedFragmentIdx(fragmentIdx);
        onFragmentSelected(fragmentIdx);
    };

    useEffect(() => {
        if (lastCreatedFragmentRef.current && lastCreatedFragmentIdx >= 0) {
            lastCreatedFragmentRef.current.scrollIntoView();
            setLastCreatedFragmentIdx(-1);
        }
    });

    return (
        <div className='fragments'>
            <div>Fragments:</div>
            <div className='scrolling'>

                {fragments.map(({ startSec, endSec }, key) => (
                    <div
                        className={`button ${
                            selectedFragmentIdx === key ? 'active' : ''
                        }`}
                        key={key}
                        onClick={handleClickFragment.bind(null, key)}
                        ref={(key == lastCreatedFragmentIdx) ? lastCreatedFragmentRef : null}
                    >
                        #{key+1}
                    </div>
                ))}
            </div>
         </div>);
}

export default Fragments;
