import { PageAreas, pageAreasFromObj } from './../v0001/pageareas'
import {stringToSecs} from "../../utils";

export interface Section {
    readonly pageIdxs: ReadonlyArray<number>
    readonly startSec: number // a float: seconds + 1st digit after  point
    readonly endSec: number // a float: seconds + 1st digit after  point
    readonly pageAreas: ReadonlyArray<PageAreas>
}

export function sectionFromObj(obj: any): Section {
    return {
        pageIdxs: obj.pageIdxs || [],
        startSec: obj.start ? stringToSecs(obj.start) : obj.startSec,
        endSec: obj.end ? stringToSecs(obj.end) : obj.endSec,
        pageAreas: (obj.pageAreas || []).map((pa: any) => pageAreasFromObj(pa))
    }
}

