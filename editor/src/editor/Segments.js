import React, {useState, useRef, useEffect} from 'react';
import { secsToString } from "emptybars-common/utils";

import './Segments.scss';

function Segments({ segments, onSegmentSelected, onSegmentsChanged}) {
    var [selectedSegmentIdx, setSelectedSegmentIdx] = useState(-1);
    var [lastCreatedSegmentIdx, setLastCreatedSegmentIdx] = useState(-1);
    const lastCreatedSegmentRef = useRef(null);

    const handleClickSegment = (segmentIdx, segment) => {
        setSelectedSegmentIdx(segmentIdx);
        console.log(segment);
        onSegmentSelected(segmentIdx, segment);
    };

    useEffect(() => {
        if (lastCreatedSegmentRef.current && lastCreatedSegmentIdx >= 0) {
            lastCreatedSegmentRef.current.scrollIntoView();
            setLastCreatedSegmentIdx(-1);
        }
    });

    const handleAddSegmentClick = () => {
        const newSegments = JSON.parse(JSON.stringify(segments));
        if (newSegments.length > 0) {
            newSegments.push({
                startSec: segments[segments.length-1].endSec,
                endSec: segments[segments.length-1].endSec + 10
            });
        } else {
            newSegments.push({
                startSec: 0,
                endSec: 10
            });
        }
        onSegmentsChanged(newSegments, "add segment");
        setLastCreatedSegmentIdx(newSegments.length - 1);
        handleClickSegment(newSegments.length - 1, newSegments[newSegments.length-1]);
    }

    return (
        <div className='segments'>
            <div className='scrolling'>
                <div className='addButton' onClick={handleAddSegmentClick.bind(null)}>
                    Add segment
                </div>

                {segments.map(({ startSec, endSec }, key) => (
                    <div
                        className={`button ${
                            selectedSegmentIdx === key ? 'active' : ''
                        }`}
                        key={key}
                        onClick={handleClickSegment.bind(null, key, segments[key])}
                        ref={(key == lastCreatedSegmentIdx) ? lastCreatedSegmentRef : null}
                    >
                        Segment {key+1}: {secsToString(startSec)} - {secsToString(endSec)}
                    </div>
                ))}
            </div>
         </div>);
}

export default Segments;
