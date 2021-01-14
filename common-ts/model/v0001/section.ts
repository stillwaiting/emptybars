import PageAreas from './pageareas'
import {stringToSecs} from "../../utils";

export interface Section {
    readonly pages: ReadonlyArray<number>
    readonly startSec: number // a float: seconds + 1st digit after  point
    readonly endSec: number // a float: seconds + 1st digit after  point
    readonly pageAreas: ReadonlyArray<PageAreas>
}

export function sectionFromJson(json: any): Section {
    return {
        pages: json.pages,
        startSec: stringToSecs(json.start),
        endSec: stringToSecs(json.end),
        pageAreas: <ReadonlyArray<PageAreas>>json.pageAreas
    }
}

