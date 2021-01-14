import Area from "./area";
import {stringToSecs} from "../../utils";

export interface Section {
    readonly pages: ReadonlyArray<string>,
    readonly pageAreas: {[key:string]: ReadonlyArray<Area>}
    readonly startSec: number,
    readonly endSec: number,
}

export function sectionFromObj(obj: any): Section {
    const pageAreas: {[key:string]: Area} = {};
    return {
        pages: <ReadonlyArray<string>> obj.pages,
        pageAreas: <{[key:string]: ReadonlyArray<Area>}> obj.pageAreas,
        startSec: stringToSecs(obj.start),
        endSec: stringToSecs(obj.end)
    }
}