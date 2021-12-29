import React from 'react';
import { useRef, useState, useEffect } from 'react';
import ImageAreas from "./ImageAreas";

import './SectionPages.scss';

function SectionPages({ images, pages, sectionPageAreas, skipScrollingFromTime, onPageClicked }) {
	
    const [zoom, setZoom] = useState(1);
    const [lastScrollHash, setLastScrollHash] = useState("");
    const sectionPagesRef = useRef();
    
    

    const handleZoomIn = () => {
        setZoom(zoom + 0.1);
    }

    const handleZoomOut = () => {
        setZoom(zoom - 0.1);
    }

    const handleReset = () => {
        setZoom(1);
    }

    const findFirstSelectedPageIdx = () => {
        var selectedPageIdx = -1;
        for (var idx = 0; idx < pages.length; idx++) {
            if (sectionPageAreas[idx] && sectionPageAreas[idx].length) {
                selectedPageIdx = idx;
                break;
            }
        }
        return selectedPageIdx;
    }

    const findScrollareaNode = () => {
        for (var i = 0; i < sectionPagesRef.current.childNodes.length; i++) {
            if (sectionPagesRef.current.childNodes[i].className == 'scrollArea') {
                return sectionPagesRef.current.childNodes[i];
            }
        }
        throw 'Cannot find scrollArea, should never happen';
    }

    const findPageNode = (selectedPageIdx) => {
        var container = findScrollareaNode();
        var invariant = 0;
        for (var i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].className == "page") {
                if (invariant == selectedPageIdx) {
                    return container.childNodes[i];
                }
                invariant ++;
            }
        }
        throw "cannot find page " + selectedPageIdx + ", should never happen";
    }

    const onImageClicked = (pageIdx, imageX, imageY) => {
        onPageClicked(pageIdx, imageX, imageY);
    }

    const calculatePageHeight = () =>
        parseInt(500*zoom*297/210 + 20);

    const calculatePageWidth = () =>
        parseInt(500*zoom + 20);

    const shouldSkipScrolling = () =>
        skipScrollingFromTime && ((new Date().getTime() - skipScrollingFromTime) < 2000);

    const handleScrolling = () => {
        const hash = JSON.stringify(sectionPageAreas);
        if (lastScrollHash != hash && sectionPagesRef.current) {
            var updateHash = true;
            const selectedPageIdx = findFirstSelectedPageIdx();
            if (selectedPageIdx >= 0) {
                var page = findPageNode(selectedPageIdx);
                if (!shouldSkipScrolling()) {
                    sectionPagesRef.current.scrollTop = page.offsetTop - findScrollareaNode().offsetTop;
                }
                if (page.offsetTop == 0) {
                    updateHash = false;
                }
                if (!shouldSkipScrolling() && Object.keys(sectionPageAreas).length > 1) {
                    sectionPagesRef.current.scrollTop += parseInt(calculatePageHeight() / 2);
                }
            }
            if (updateHash) {
                setLastScrollHash(hash);
            }
        }
    }

    useEffect(handleScrolling, []);
    handleScrolling();

    const sectionPagesStyles = {
        height: calculatePageHeight() + "px",
        width: calculatePageWidth() + "px"
    }
    
	if (!images || images.length == 0) {
		return <div className='sectionPages'></div>;
	}
	
    return <div>
        <div className='sectionPages' ref={sectionPagesRef} style={sectionPagesStyles}>
            <div className='zoom'>
                <img src='https://images2.imgbox.com/22/21/4gO3I6ii_o.png?download=true' width='32' onClick={handleZoomIn} />
                <img src='https://images2.imgbox.com/1b/b2/L4tgMq2a_o.png?download=true' width='32' onClick={handleZoomOut} />
                <img src='https://images2.imgbox.com/f3/d5/paRxNKm0_o.png?download=true' width='32' onClick={handleReset} />
            </div>
            <div className='scrollArea'>
            {pages.map((p, idx) => {
                return <div className='page' key={"sectionpage" + idx}>
                            <ImageAreas
                                title={`Page #${idx+1}`}
                                rectangles={p.rectangles || []}
                                image={images[idx]}
                                onImageClicked={((imageX, imageY) => onImageClicked(idx, imageX, imageY)).bind(this)}
                                width = {parseInt(500 * zoom)} areas={sectionPageAreas[idx] || [] }
                            />
                        </div>;
            })}
            </div>
        </div>
    </div>;
};

export default SectionPages;
