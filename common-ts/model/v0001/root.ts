import { Section  as V0Section } from '../v0000/section';
import { Section, sectionFromObj } from './section';
import { Root as V0Root, rootFromObj as v0RootFromJsonObj } from '../v0000/root';
import { Page as V0Page } from "../v0000/page";
import {secsToString} from "../../utils";
import { Root as ProtoRoot,
    Section as ProtoSection,
    SectionPageAreas as ProtoSectionPageAreas,
    Area as ProtoArea} from "./proto/schema_pb";

var lz4 = require("lz4js");

export function rootCurrentVersion(): number {
    return 1;
}

export interface Root {
    readonly videoUrl: string,
    readonly pageUrls: ReadonlyArray<string>,
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
        version: rootCurrentVersion(),
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
        version: rootCurrentVersion(),
        pageUrls: json.pageUrls || [],
        sections: (json.sections || []).map(sectionFromObj)
    };
}

export function rootToBinaryString(root: Root): string {
    const protoRoot = new ProtoRoot();
    protoRoot.setVersion(root.version);
    protoRoot.setVideourl(root.videoUrl);
    root.pageUrls.forEach(pageUrl => protoRoot.addPageurls(pageUrl));
    root.sections.forEach(section => {
        const protoSection = new ProtoSection();
        protoSection.setEndsecsmultiply10(section.endSec * 10);
        protoSection.setStartsecsmultiply10(section.startSec * 10);
        section.pages.forEach(page  => protoSection.addPages(page));
        section.pageAreas.forEach(pageArea => {
            const protoSectionPageArea = new ProtoSectionPageAreas();
            protoSectionPageArea.setPageidx(pageArea.pageIdx);
            pageArea.areas.forEach(area => {
                const protoArea = new ProtoArea();
                protoArea.setX(area.x);
                protoArea.setY(area.y);
                protoArea.setWidth(area.width);
                protoArea.setHeight(area.height);
                protoSectionPageArea.addAreas(protoArea);
            });
            protoSection.addPageareas(protoSectionPageArea);
        })
        protoRoot.addSections(protoSection);
    });
    const bytes = protoRoot.serializeBinary();
    const compressed = lz4.compress(Buffer.from(bytes))
    return root.version + "-" + Buffer.from(compressed).toString('base64');
}

export function rootFromBinaryString(binaryString: string): Root  {
    const [version, compressedRoot] = binaryString.split('-', 2);
    if (parseInt(version) !== rootCurrentVersion()) {
        throw `Not supported version $version`;
    }
    const decompressedRoot = lz4.decompress(Buffer.from(compressedRoot, 'base64'));
    const protoRoot = ProtoRoot.deserializeBinary(decompressedRoot);

    const root: Root = {
        videoUrl: protoRoot.getVideourl()!!,
        version: protoRoot.getVersion()!!,
        pageUrls: protoRoot.getPageurlsList(),
        sections: protoRoot.getSectionsList().map(protoSection => ({
            startSec: protoSection.getStartsecsmultiply10()!!  /  10.0,
            endSec:  protoSection.getEndsecsmultiply10()!! / 10.0,
            pages:  protoSection.getPagesList()!!,
            pageAreas: protoSection.getPageareasList().map(protoPageArea => ({
                pageIdx: protoPageArea.getPageidx()!!,
                areas: protoPageArea.getAreasList().map(protoArea => ({
                    x: protoArea.getX()!!,
                    y: protoArea.getY()!!,
                    width: protoArea.getWidth()!!,
                    height: protoArea.getHeight()!!
                }))
            }))
        }))
    };
    return root;
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