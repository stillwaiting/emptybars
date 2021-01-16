// package: 
// file: schema.proto

import * as jspb from "google-protobuf";

export class Root extends jspb.Message {
  hasVideourl(): boolean;
  clearVideourl(): void;
  getVideourl(): string | undefined;
  setVideourl(value: string): void;

  clearPageurlsList(): void;
  getPageurlsList(): Array<string>;
  setPageurlsList(value: Array<string>): void;
  addPageurls(value: string, index?: number): string;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  clearSectionsList(): void;
  getSectionsList(): Array<Section>;
  setSectionsList(value: Array<Section>): void;
  addSections(value?: Section, index?: number): Section;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Root.AsObject;
  static toObject(includeInstance: boolean, msg: Root): Root.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Root, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Root;
  static deserializeBinaryFromReader(message: Root, reader: jspb.BinaryReader): Root;
}

export namespace Root {
  export type AsObject = {
    videourl?: string,
    pageurlsList: Array<string>,
    version?: number,
    sectionsList: Array<Section.AsObject>,
  }
}

export class Section extends jspb.Message {
  clearPagesList(): void;
  getPagesList(): Array<number>;
  setPagesList(value: Array<number>): void;
  addPages(value: number, index?: number): number;

  clearPageareasList(): void;
  getPageareasList(): Array<SectionPageAreas>;
  setPageareasList(value: Array<SectionPageAreas>): void;
  addPageareas(value?: SectionPageAreas, index?: number): SectionPageAreas;

  hasStartsecsmultiply10(): boolean;
  clearStartsecsmultiply10(): void;
  getStartsecsmultiply10(): number | undefined;
  setStartsecsmultiply10(value: number): void;

  hasEndsecsmultiply10(): boolean;
  clearEndsecsmultiply10(): void;
  getEndsecsmultiply10(): number | undefined;
  setEndsecsmultiply10(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Section.AsObject;
  static toObject(includeInstance: boolean, msg: Section): Section.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Section, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Section;
  static deserializeBinaryFromReader(message: Section, reader: jspb.BinaryReader): Section;
}

export namespace Section {
  export type AsObject = {
    pagesList: Array<number>,
    pageareasList: Array<SectionPageAreas.AsObject>,
    startsecsmultiply10?: number,
    endsecsmultiply10?: number,
  }
}

export class SectionPageAreas extends jspb.Message {
  hasPageidx(): boolean;
  clearPageidx(): void;
  getPageidx(): number | undefined;
  setPageidx(value: number): void;

  clearAreasList(): void;
  getAreasList(): Array<Area>;
  setAreasList(value: Array<Area>): void;
  addAreas(value?: Area, index?: number): Area;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SectionPageAreas.AsObject;
  static toObject(includeInstance: boolean, msg: SectionPageAreas): SectionPageAreas.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SectionPageAreas, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SectionPageAreas;
  static deserializeBinaryFromReader(message: SectionPageAreas, reader: jspb.BinaryReader): SectionPageAreas;
}

export namespace SectionPageAreas {
  export type AsObject = {
    pageidx?: number,
    areasList: Array<Area.AsObject>,
  }
}

export class Area extends jspb.Message {
  hasX(): boolean;
  clearX(): void;
  getX(): number | undefined;
  setX(value: number): void;

  hasY(): boolean;
  clearY(): void;
  getY(): number | undefined;
  setY(value: number): void;

  hasWidth(): boolean;
  clearWidth(): void;
  getWidth(): number | undefined;
  setWidth(value: number): void;

  hasHeight(): boolean;
  clearHeight(): void;
  getHeight(): number | undefined;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Area.AsObject;
  static toObject(includeInstance: boolean, msg: Area): Area.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Area, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Area;
  static deserializeBinaryFromReader(message: Area, reader: jspb.BinaryReader): Area;
}

export namespace Area {
  export type AsObject = {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  }
}

