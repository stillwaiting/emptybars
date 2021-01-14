import Area from '../v0000/area'

interface PageAreas {
    readonly pageIdx: number,
    readonly areas: ReadonlyArray<Area>
}

export default PageAreas;