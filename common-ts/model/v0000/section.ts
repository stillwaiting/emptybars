import Area from "./area";
import {stringToSecs} from "../../utils";

export interface Section {
    readonly pages: ReadonlyArray<string>,
    readonly pageAreas: {[key:string]: ReadonlyArray<Area>}
    readonly startSec: number,
    readonly endSec: number,
}

function removeEmpty(obj: any): any {
    Object.keys(obj).forEach(key => {
        if (!obj[key]) {
            delete obj[key];
        }
    });
    return obj;
}

export function sectionFromObj(obj: any): Section {
    const pageAreas: {[key:string]: Area} = {};
    return {
        pages: <ReadonlyArray<string>> obj.pages || [],
        pageAreas: <{[key:string]: ReadonlyArray<Area>}> (removeEmpty(obj.pageAreas || {})),
        startSec: obj.start ? stringToSecs(obj.start) : obj.startSec,
        endSec: obj.end ? stringToSecs(obj.end) : obj.endSec
    }
}