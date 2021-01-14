import PageAreas from './pageareas'
import {stringToSecs} from "../../utils";

export interface Section {
    readonly pageIdxs: ReadonlyArray<number>
    readonly startSec: number // a float: seconds + 1st digit after  point
    readonly endSec: number // a float: seconds + 1st digit after  point
    readonly pageAreas: ReadonlyArray<PageAreas>
}

export function sectionFromJson(json: any): Section {
    return {
        pageIdxs: json.pageIdxs,
        startSec: stringToSecs(json.start),
        endSec: stringToSecs(json.end),
        pageAreas: <ReadonlyArray<PageAreas>>json.pageAreas
    }
}

