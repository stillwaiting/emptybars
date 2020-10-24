import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "../utils";

import './Fragments.scss';

function Fragments({ fragments, onFragmentSelected, onFragmentsChanged}) {
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
        handleClickFragment(fragments.length - 1);
        onFragmentsChanged(JSON.parse(JSON.stringify(fragments)));
        setLastCreatedFragmentIdx(fragments.length-1);
    }

    return (
        <div className='fragments'>
            <div className='scrolling'>
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
                        ref={(key == lastCreatedFragmentIdx) ? lastCreatedFragmentRef : null}
                    >
                        Fragment {key+1}: {secsToString(startSec)} - {secsToString(endSec)}
                    </div>
                ))}
            </div>
         </div>);
}

export default Fragments;
