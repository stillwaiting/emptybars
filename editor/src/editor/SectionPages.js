import React from 'react';
import ImageAreas from "./ImageAreas";

import './SectionPages.scss';

function SectionPages({ pages, sectionPages, sectionPageAreas, onSectionPagesChanges, onSectionPageAreasChanged }) {
    const handleOnPageSelected = (e, pageIdx) => {
        var newSectionPages = JSON.parse(JSON.stringify(sectionPages));
        if (e.target.checked) {
            newSectionPages.push(pageIdx);
        } else {
            newSectionPages = newSectionPages.filter(it => it != pageIdx);
        }
        onSectionPagesChanges(newSectionPages, 'list of section pages updated');
    }

    const handleOnNewAreaAdded = (pageIdx, newArea) => {
        const newSectionPageAreas = JSON.parse(JSON.stringify(sectionPageAreas));
        const pageAreas = findPageAreas(newSectionPageAreas, pageIdx)
        if (!pageAreas) {
            newSectionPageAreas.push({
                pageIdx: pageIdx,
                areas: [newArea]
            });
        } else {
            pageAreas.push(newArea);
        }
        onSectionPageAreasChanged(newSectionPageAreas, 'page area added');
    }

    const findPageAreas = (sectionPageAreas, pageIdx) => {
        const pageAreasObj = sectionPageAreas.find(it => it.pageIdx == pageIdx)
        if (!pageAreasObj) {
            return undefined;
        }
        return pageAreasObj.areas;
    }

    const removeEmptyPageAreas = (sectionPageAreas) =>
        sectionPageAreas.filter(it => it.areas.length > 0);

    const handleOnDeleteArea = (pageIdx, areaIdx) => {
        var newSectionPageAreas = JSON.parse(JSON.stringify(sectionPageAreas));
        const pageAreas = findPageAreas(newSectionPageAreas, pageIdx)
        pageAreas.splice(areaIdx, 1);
        newSectionPageAreas = removeEmptyPageAreas(newSectionPageAreas);
        onSectionPageAreasChanged(newSectionPageAreas, 'page area deleted');
    }

    return <div className='sectionPages'>

        <div className='pageCheckboxWrapper'>
            {pages.map((p, idx) => {
                return <div key={'input' + idx}>
                    <input
                        type="checkbox"
                        checked={(sectionPages.indexOf(idx) >= 0) ? true : false}
                        onChange={((e) => handleOnPageSelected(e, idx)).bind(this)}
                    /> <span onClick={((e) =>
                            handleOnPageSelected({
                                target: {
                                    checked: (sectionPages.indexOf(idx) < 0)
                                }
                            }, idx)).bind(this)
                    }>Page #{idx + 1}</span>
                </div>
            })}
        </div>

        {pages.map((p, idx) => {
            return (sectionPages.indexOf(idx) >= 0) ?
                    <div className='page' key={'page' + idx}>
                        <ImageAreas
                            title={`Page #${idx+1}`}
                            imgUrl={p.url}
                            width = {500}
                            areas={findPageAreas(sectionPageAreas, idx) || []}
                            rectangles={p.rectangles}
                            onNewAreaAdded={((area) => handleOnNewAreaAdded(idx, area)).bind(this)}
                            onDeleteArea={((areaIdx) => handleOnDeleteArea(idx, areaIdx)).bind(this)}
                        />
                    </div>
                    : '';
        })}
    </div>;
};

export default SectionPages;
