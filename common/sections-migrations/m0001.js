/**
 * Converts:
 *      - section.pages from array of IDs to array of IDX
 *      - section.pageAreas from object to an array with pageIdx
 *      - pages to pageUrls
 */

const sectionPagesIdsToIdx = (obj) => {
    obj.sections.map(
        section => {
            const newPages = section.pages.map(
                pageId => obj.pages.findIndex(
                    page => page.id == pageId
                )
            )
            section.pages = newPages;
        }
    )
}

const sectionPageAreasToArray = (obj) => {
    obj.sections.map(
        section => {
            const newPageAreas = [];
            Object.keys(section.pageAreas).forEach((pageId) => {
                const pageIdx = obj.pages.findIndex(p => p.id ==pageId)
                newPageAreas.push({
                    pageIdx: pageIdx,
                    areas: section.pageAreas[pageId]
                });
            });
            section.pageAreas = newPageAreas;
        }
    )
    return obj;
}

export default {
    version: 1,
    migrate: (obj) => {
        sectionPagesIdsToIdx(obj)
        sectionPageAreasToArray(obj)

        obj.pageUrls = obj.pages.map(page => page.url);
        delete obj.pages;
        return obj;
    }
}