import React from 'react';
import { useRef, useState } from 'react';
import ImageAreas from "./ImageAreas";

import './FragmentPages.scss';

function FragmentPages({ images, pages, fragmentPages, fragmentPageAreas }) {
    const [zoom, setZoom] = useState(1);
    const fragmentPagesRef = useRef();

    const handleZoomIn = () => {
        setZoom(zoom + 0.1);
    }

    const handleZoomOut = () => {
        setZoom(zoom - 0.1);
    }

    const handleReset = () => {
        setZoom(1);
    }

    // if (fragmentPagesRef && fragmentPagesRef.current) {
    //     fragmentPagesRef.current.scrollTop = 100;
    // }

    const fragmentPagesStyles = {
        height: parseInt(500*zoom*297/210 + 20) + "px"
    }

    return <div>
        <div>Zoom: <span onClick={handleZoomIn}>+</span> <span onClick={handleZoomOut}>-</span> <span onClick={handleReset}>reset</span></div>
        <div className='fragmentPages' ref={fragmentPagesRef} style={fragmentPagesStyles}>
            <div className='scrollArea'>
            {pages.map((p, idx) => {
                return <div className='page' key={"fragmentpage" + idx}>
                            <ImageAreas
                                title={`Page #${idx+1}`}
                                image={images[idx]}
                                width = {parseInt(500 * zoom)} areas={fragmentPageAreas[p.id] || [] }
                            />
                        </div>;
            })}
            </div>
        </div>
    </div>;
};

export default FragmentPages;
