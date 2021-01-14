
export interface Page {
    readonly id: string,
    readonly url: string
}

export function pageFromObj(obj: any): Page {
    return obj;
}