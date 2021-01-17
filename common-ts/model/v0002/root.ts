import { Section  as V1Section } from '../v0001/section';
import { Section, sectionFromObj } from './section';
import { Root as V1Root, rootFromObj as v1RootFromJsonObj, rootFromBinaryString as rootFromOldBinaryString } from '../v0001/root';
import {secsToString} from "../../utils";
import { Root as ProtoRoot,
    Section as ProtoSection,
    SectionPageAreas as ProtoSectionPageAreas,
    Area as ProtoArea} from "./proto/schema_pb";

var lz4 = require("lz4js");

export function rootCurrentVersion(): number {
    return 2;
}

export interface Root {
    readonly videoUrl: string,
    readonly pageUrls: ReadonlyArray<string>,
    readonly version: number,
    readonly sections: ReadonlyArray<Section>,
    readonly changeCounter: number,
    readonly updatedAt: Date
}

function sectionFromOldSection(oldSection: V1Section): Section {
    return {
        startSec: oldSection.startSec,
        endSec: oldSection.endSec,
        pageAreas: oldSection.pageAreas,
        pageIdxs: oldSection.pages
    };
}

function rootFromOldVersionObj(json: any): Root {
    let oldRoot: V1Root = v1RootFromJsonObj(json);

    return {
        videoUrl: oldRoot.videoUrl,
        version: rootCurrentVersion(),
        pageUrls: oldRoot.pageUrls,
        sections: oldRoot.sections.map(oldSection => sectionFromOldSection(oldSection)),
        changeCounter: 0,
        updatedAt: new Date()
    }
}

export function rootFromObj(json: any): Root {
    if (!json.version || json.version < rootCurrentVersion()) {
        return rootFromOldVersionObj(json);
    }

    return {
        videoUrl: json.videoUrl,
        version: rootCurrentVersion(),
        pageUrls: json.pageUrls || [],
        sections: (json.sections || []).map(sectionFromObj),
        changeCounter: json.changeCounter,
        updatedAt: new Date(json.updatedAt)
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
        section.pageIdxs.forEach(page  => protoSection.addPageidxs(page));
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
    protoRoot.setChangecounter(root.changeCounter);
    protoRoot.setUpdatedattimestamp(root.updatedAt.getTime());
    const bytes = protoRoot.serializeBinary();
    const compressed = lz4.compress(Buffer.from(bytes))
    return root.version + "-" + Buffer.from(compressed).toString('base64');
}

export function rootFromBinaryString(binaryString: string): Root  {
    const [version, compressedRoot] = binaryString.split('-', 2);
    if (parseInt(version) < rootCurrentVersion()) {
        return rootFromOldVersionObj(rootFromOldBinaryString(binaryString));
    }

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
            pageIdxs:  protoSection.getPageidxsList()!!,
            pageAreas: protoSection.getPageareasList().map(protoPageArea => ({
                pageIdx: protoPageArea.getPageidx()!!,
                areas: protoPageArea.getAreasList().map(protoArea => ({
                    x: protoArea.getX()!!,
                    y: protoArea.getY()!!,
                    width: protoArea.getWidth()!!,
                    height: protoArea.getHeight()!!
                }))
            }))
        })),
        changeCounter: protoRoot.getChangecounter()!!,
        updatedAt: new Date(protoRoot.getUpdatedattimestamp()!!)
    };
    return root;
}

export function rootToObj(root: Root): any {
    const clone: Root = JSON.parse(JSON.stringify(root));
    const newSections = clone.sections.map(section => ({
        start: secsToString(section.startSec),
        end: secsToString(section.endSec),
        pageAreas: section.pageAreas,
        pageIdxs: section.pageIdxs
    }));
    // @ts-ignore
    clone.sections = newSections;
    return clone;
}