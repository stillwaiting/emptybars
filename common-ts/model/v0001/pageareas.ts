import Area from '../v0000/area'

export interface PageAreas {
    readonly pageIdx: number,
    readonly areas: ReadonlyArray<Area>
}

export function pageAreasFromObj(obj: any): PageAreas {
    return {
        pageIdx: obj.pageIdx,
        areas: (obj.areas || []).map((area: any) => ({
            x: area.x,
            y: area.y,
            width: area.width,
            height: area.height
        }))
    }
}