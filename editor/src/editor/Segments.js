import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";

import './Segments.scss';

function Segments({ fragments, onFragmentSelected, onFragmentsChanged}) {
    var [selectedFragmentIdx, setSelectedFragmentIdx] = useState(-1);
    var [lastCreatedFragmentIdx, setLastCreatedFragmentIdx] = useState(-1);
    const lastCreatedFragmentRef = useRef(null);

    const handleClickFragment = (fragmentIdx, fragment) => {
        setSelectedFragmentIdx(fragmentIdx);
        console.log(fragment);
        onFragmentSelected(fragmentIdx, fragment);
    };

    useEffect(() => {
        if (lastCreatedFragmentRef.current && lastCreatedFragmentIdx >= 0) {
            lastCreatedFragmentRef.current.scrollIntoView();
            setLastCreatedFragmentIdx(-1);
        }
    });

    const handleAddFragmentClick = () => {
        const newFragments = JSON.parse(JSON.stringify(fragments));
        if (newFragments.length > 0) {
            newFragments.push({
                startSec: fragments[fragments.length-1].endSec,
                endSec: fragments[fragments.length-1].endSec + 10
            });
        } else {
            newFragments.push({
                startSec: 0,
                endSec: 10
            });
        }
        onFragmentsChanged(newFragments, "add fragment");
        setLastCreatedFragmentIdx(newFragments.length - 1);
        handleClickFragment(newFragments.length - 1, newFragments[newFragments.length-1]);
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
                        onClick={handleClickFragment.bind(null, key, fragments[key])}
                        ref={(key == lastCreatedFragmentIdx) ? lastCreatedFragmentRef : null}
                    >
                        Fragment {key+1}: {secsToString(startSec)} - {secsToString(endSec)}
                    </div>
                ))}
            </div>
         </div>);
}

export default Segments;
