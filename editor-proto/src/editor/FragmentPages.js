import React from 'react';
import ImageAreas from "./ImageAreas";

function FragmentPages({ pages, fragmentPages, fragmentPageAreas, onFragmentPagesChanges, onFragmentPageAreasChanged }) {
    const handleOnChange = (e, pageIdx) => {
        var newFragmentPages = JSON.parse(JSON.stringify(fragmentPages));
        const page = pages[pageIdx];
        if (e.target.checked) {
            newFragmentPages.push(page.id);
        } else {
            newFragmentPages = newFragmentPages.filter(it => it != page.id);
        }
        onFragmentPagesChanges(newFragmentPages);
    }

    const handleOnNewAreaAdded = (pageId, newArea) => {
        const newFragmentPageAreas = JSON.parse(JSON.stringify(fragmentPageAreas));
        if (!newFragmentPageAreas[pageId]) {
            newFragmentPageAreas[pageId] = [newArea];
        } else {
            newFragmentPageAreas[pageId].push(newArea);
        }
        onFragmentPageAreasChanged(newFragmentPageAreas);
    }

    const handleOnDeleteArea = (pageId, areaIdx) => {
        const newFragmentPageAreas = JSON.parse(JSON.stringify(fragmentPageAreas));
        newFragmentPageAreas[pageId].splice(areaIdx, 1);
        onFragmentPageAreasChanged(newFragmentPageAreas);
    }

    return <div>
        {pages.map((p, idx) => {
            return <div>
                <input type="checkbox" checked={(fragmentPages.indexOf(p.id)) >= 0 ? true : false} onChange={((e) => handleOnChange(e, idx)).bind(this)} /> Page #{idx + 1}
            </div>
        })}


        {pages.map((p, idx) => {
            return (fragmentPages.indexOf(p.id) >= 0) ?
                    <div>
                        Page #{idx+1}
                    <ImageAreas imgUrl={p.url} width = {500} areas={fragmentPageAreas[p.id] || [] }
                                onNewAreaAdded={((area) => handleOnNewAreaAdded(p.id, area)).bind(this)}
                                onDeleteArea={((areaIdx) => handleOnDeleteArea(p.id, areaIdx)).bind(this)}
                    />
                    </div>
                    : '';
        })}
    </div>;
};

export default FragmentPages;
