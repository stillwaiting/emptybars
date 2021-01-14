import { Section  as V0Section } from '../v0000/section';
import { Section, sectionFromJson } from './section';
import { Root as V0Root, rootFromObj as v0RootFromJsonObj } from '../v0000/root';
import { Page as V0Page } from "../v0000/page";
import {secsToString} from "../../utils";

export interface Root {
    readonly videoUrl: string,
    readonly pageUrls: ReadonlyArray<String>,
    readonly version: number,
    readonly sections: ReadonlyArray<Section>
}

function sectionFromOldSection(oldSection: V0Section, pages: ReadonlyArray<V0Page>): Section {
    return {
        startSec: oldSection.startSec,
        endSec: oldSection.endSec,
        pageAreas: Object.keys(oldSection.pageAreas).map(pageId => ({
            pageIdx: pages.findIndex(oldPage => oldPage.id === pageId),
            areas: oldSection.pageAreas[pageId]
        })),
        pages: Object.keys(oldSection.pageAreas).map(pageId => pages.findIndex(oldPage => oldPage.id === pageId))
    };
}

function rootFromOldVersionObj(json: any): Root {
    let oldRoot: V0Root = v0RootFromJsonObj(json);

    return {
        videoUrl: oldRoot.videoUrl,
        version: 1,
        pageUrls: oldRoot.pages.map(page => page.url),
        sections: oldRoot.sections.map(oldSection => sectionFromOldSection(oldSection, oldRoot.pages))
    }
}

export function rootFromObj(json: any): Root {
    if (!json.version) {
        return rootFromOldVersionObj(json);
    }

    return {
        videoUrl: json.videoUrl,
        version: 1,
        pageUrls: json.pageUrls,
        sections: json.sections.map(sectionFromJson)
    };
}

export function rootToObj(root: Root): any {
    const clone: Root = JSON.parse(JSON.stringify(root));
    const newSections = clone.sections.map(section => ({
        start: secsToString(section.startSec),
        end: secsToString(section.endSec),
        pageAreas: section.pageAreas,
        pages: section.pages
    }));
    // @ts-ignore
    clone.sections = newSections;
    return clone;
}