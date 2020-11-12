import React from 'react';
import { useRef, useState, useEffect } from 'react';
import ImageAreas from "./ImageAreas";

import './SegmentPages.scss';

function SegmentPages({ images, pages, fragmentPageAreas, skipScrollingFromTime, onPageClicked }) {
    const [zoom, setZoom] = useState(1);
    const [lastScrollHash, setLastScrollHash] = useState("");
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

    const findFirstSelectedPageIdx = () => {
        var selectedPageIdx = -1;
        for (var idx = 0; idx < pages.length; idx++) {
            const puid = pages[idx].id;
            if (fragmentPageAreas[puid] && fragmentPageAreas[puid].length) {
                selectedPageIdx = idx;
                break;
            }
        }
        return selectedPageIdx;
    }

    const findScrollareaNode = () => {
        for (var i = 0; i < fragmentPagesRef.current.childNodes.length; i++) {
            if (fragmentPagesRef.current.childNodes[i].className == 'scrollArea') {
                return fragmentPagesRef.current.childNodes[i];
            }
        }
        throw 'Cannot find scrollArea';
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
        throw "cannot find page " + selectedPageIdx;
    }

    const onImageClicked = (imageIdx, imageX, imageY) => {
        const pageId = pages[imageIdx].id;
        onPageClicked(pageId, imageX, imageY);
    }

    const calculatePageHeight = () =>
        parseInt(500*zoom*297/210 + 20);

    const calculatePageWidth = () =>
        parseInt(500*zoom + 20);

    const shouldSkipScrolling = () =>
        skipScrollingFromTime && ((new Date().getTime() - skipScrollingFromTime) < 2000);

    const handleScrolling = () => {
        const hash = JSON.stringify(fragmentPageAreas);
        if (lastScrollHash != hash && fragmentPagesRef.current) {
            var updateHash = true;
            const selectedPageIdx = findFirstSelectedPageIdx();
            if (selectedPageIdx >= 0) {
                var page = findPageNode(selectedPageIdx);
                if (!shouldSkipScrolling()) {
                    fragmentPagesRef.current.scrollTop = page.offsetTop - findScrollareaNode().offsetTop;
                }
                if (page.offsetTop == 0) {
                    updateHash = false;
                }
                if (!shouldSkipScrolling() && Object.keys(fragmentPageAreas).length > 1) {
                    fragmentPagesRef.current.scrollTop += parseInt(calculatePageHeight() / 2);
                }
            }
            if (updateHash) {
                setLastScrollHash(hash);
            }
        }
    }

    useEffect(handleScrolling, []);
    handleScrolling();

    const fragmentPagesStyles = {
        height: calculatePageHeight() + "px",
        width: calculatePageWidth() + "px"
    }

    return <div>
        <div className='fragmentPages' ref={fragmentPagesRef} style={fragmentPagesStyles}>
            <div className='zoom'>
                <img src='https://images2.imgbox.com/22/21/4gO3I6ii_o.png?download=true' width='32' onClick={handleZoomIn} />
                <img src='https://images2.imgbox.com/1b/b2/L4tgMq2a_o.png?download=true' width='32' onClick={handleZoomOut} />
                <img src='https://images2.imgbox.com/f3/d5/paRxNKm0_o.png?download=true' width='32' onClick={handleReset} />
            </div>
            <div className='scrollArea'>
            {pages.map((p, idx) => {
                return <div className='page' key={"fragmentpage" + idx}>
                            <ImageAreas
                                title={`Page #${idx+1}`}
                                image={images[idx]}
                                onImageClicked={((imageX, imageY) => onImageClicked(idx, imageX, imageY)).bind(this)}
                                width = {parseInt(500 * zoom)} areas={fragmentPageAreas[p.id] || [] }
                            />
                        </div>;
            })}
            </div>
        </div>
    </div>;
};

export default SegmentPages;
