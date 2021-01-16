import { Section, sectionFromObj } from './section';
import { Page, pageFromObj } from './page';

export interface Root {
    readonly sections: ReadonlyArray<Section>,
    readonly pages: ReadonlyArray<Page>,
    readonly videoUrl: string
}

export function rootFromObj(obj: any): Root {
    return {
        pages: (obj.pages || []).map(pageFromObj),
        sections: (obj.sections || []).map(sectionFromObj),
        videoUrl: obj.videoUrl
    }
}