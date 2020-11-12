import React from 'react';
import ImageAreas from "./ImageAreas";

import './SegmentPages.scss';

function SegmentPages({ pages, segmentPages, segmentPageAreas, onSegmentPagesChanges, onSegmentPageAreasChanged }) {
    const handleOnChange = (e, pageIdx) => {
        var newSegmentPages = JSON.parse(JSON.stringify(segmentPages));
        const page = pages[pageIdx];
        if (e.target.checked) {
            newSegmentPages.push(page.id);
        } else {
            newSegmentPages = newSegmentPages.filter(it => it != page.id);
        }
        onSegmentPagesChanges(newSegmentPages, 'list of segment pages updated');
    }

    const handleOnNewAreaAdded = (pageId, newArea) => {
        const newSegmentPageAreas = JSON.parse(JSON.stringify(segmentPageAreas));
        if (!newSegmentPageAreas[pageId]) {
            newSegmentPageAreas[pageId] = [newArea];
        } else {
            newSegmentPageAreas[pageId].push(newArea);
        }
        onSegmentPageAreasChanged(newSegmentPageAreas, 'page area added');
    }

    const handleOnDeleteArea = (pageId, areaIdx) => {
        const newSegmentPageAreas = JSON.parse(JSON.stringify(segmentPageAreas));
        newSegmentPageAreas[pageId].splice(areaIdx, 1);
        onSegmentPageAreasChanged(newSegmentPageAreas, 'page area deleted');
    }

    return <div className='segmentPages'>
        {pages.map((p, idx) => {
            return <div>
                <input type="checkbox" checked={(segmentPages.indexOf(p.id)) >= 0 ? true : false} onChange={((e) => handleOnChange(e, idx)).bind(this)} /> Page #{idx + 1}
            </div>
        })}

        {pages.map((p, idx) => {
            return (segmentPages.indexOf(p.id) >= 0) ?
                    <div className='page'>
                        <ImageAreas
                            title={`Page #${idx+1}`}
                            imgUrl={p.url} width = {500} areas={segmentPageAreas[p.id] || [] }
                            onNewAreaAdded={((area) => handleOnNewAreaAdded(p.id, area)).bind(this)}
                            onDeleteArea={((areaIdx) => handleOnDeleteArea(p.id, areaIdx)).bind(this)}
                        />
                    </div>
                    : '';
        })}
    </div>;
};

export default SegmentPages;
