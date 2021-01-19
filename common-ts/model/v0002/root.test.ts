import {Root, rootFromBinaryString, rootFromObj, rootToBinaryString, rootToObj} from "./root";

const TEST_OBJ_V1: any = {
    version: 1,
    sections: [
        {
            pages: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [{
                        x: 753,
                        y: 169,
                        width: -724,
                        height: -171
                    },
                        {
                            x: 14,
                            y: 209,
                            width: 234,
                            height: 176
                        }]
                }
            ],
            start: "04:00.3",
            end: "04:07.9"
        },
        {
            pages: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [
                        {
                            x: 250,
                            y: 208,
                            width: 509,
                            height: 164
                        },
                        {
                            x: 25,
                            y: 387,
                            width: 285,
                            height: 173
                        }
                    ]
                }
            ],
            start: "04:07.9",
            end: "04:14.4"
        }
    ],
    pageUrls: ["https://images2.imgbox.com/f8/2b/l64abGMR_o.jpg?download=true", "https://images2.imgbox.com/3b/1c/UsutTWGB_o.jpg?download=true"],
    videoUrl: "https://www.youtube.com/watch?v=aTopxwu1KUE"
};

const TEST_OBJ_V2: any = {
    version: 2,
    changeCounter: 5,
    updatedAt: "2019-01-01T00:00:00.000Z",
    sections: [
        {
            pageIdxs: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [{
                        x: 753,
                        y: 169,
                        width: -724,
                        height: -171
                    },
                        {
                            x: 14,
                            y: 209,
                            width: 234,
                            height: 176
                        }]
                }
            ],
            start: "04:00.3",
            end: "04:07.9"
        },
        {
            pageIdxs: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [
                        {
                            x: 250,
                            y: 208,
                            width: 509,
                            height: 164
                        },
                        {
                            x: 25,
                            y: 387,
                            width: 285,
                            height: 173
                        }
                    ]
                }
            ],
            start: "04:07.9",
            end: "04:14.4"
        }
    ],
    pageUrls: ["https://images2.imgbox.com/f8/2b/l64abGMR_o.jpg?download=true", "https://images2.imgbox.com/3b/1c/UsutTWGB_o.jpg?download=true"],
    videoUrl: "https://www.youtube.com/watch?v=aTopxwu1KUE"
};

const TEST_ROOT: Root = {
    version: 2,
    updatedAt: new Date("2020-01-01T00:00:00.000Z"),
    changeCounter: 0,
    sections: [
        {
            pageIdxs: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [{
                        x: 753,
                        y: 169,
                        width: -724,
                        height: -171
                    },
                        {
                            x: 14,
                            y: 209,
                            width: 234,
                            height: 176
                        }]
                }
            ],
            startSec: 240.3,
            endSec: 247.9
        },
        {
            pageIdxs: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [
                        {
                            x: 250,
                            y: 208,
                            width: 509,
                            height: 164
                        },
                        {
                            x: 25,
                            y: 387,
                            width: 285,
                            height: 173
                        }
                    ]
                }
            ],
            startSec: 247.9,
            endSec: 254.4
        }
    ],
    pageUrls: ["https://images2.imgbox.com/f8/2b/l64abGMR_o.jpg?download=true", "https://images2.imgbox.com/3b/1c/UsutTWGB_o.jpg?download=true"],
    videoUrl: "https://www.youtube.com/watch?v=aTopxwu1KUE"
};

const TEST_ROOT_5: Root = {
    version: 2,
    updatedAt: new Date("2019-01-01T00:00:00.000Z"),
    changeCounter: 5,
    sections: [
        {
            pageIdxs: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [{
                        x: 753,
                        y: 169,
                        width: -724,
                        height: -171
                    },
                        {
                            x: 14,
                            y: 209,
                            width: 234,
                            height: 176
                        }]
                }
            ],
            startSec: 240.3,
            endSec: 247.9
        },
        {
            pageIdxs: [0],
            pageAreas: [
                {
                    pageIdx: 0,
                    areas: [
                        {
                            x: 250,
                            y: 208,
                            width: 509,
                            height: 164
                        },
                        {
                            x: 25,
                            y: 387,
                            width: 285,
                            height: 173
                        }
                    ]
                }
            ],
            startSec: 247.9,
            endSec: 254.4
        }
    ],
    pageUrls: ["https://images2.imgbox.com/f8/2b/l64abGMR_o.jpg?download=true", "https://images2.imgbox.com/3b/1c/UsutTWGB_o.jpg?download=true"],
    videoUrl: "https://www.youtube.com/watch?v=aTopxwu1KUE"
};


beforeAll(() => {
    jest
        .useFakeTimers('modern')
        .setSystemTime(new Date('2020-01-01').getTime());
});

afterAll(() => {
    jest.useRealTimers()
});

test('rootFromObj understands v1 objects', () => {
    expect(rootFromObj(TEST_OBJ_V1)).toEqual(TEST_ROOT)
});

test('rootFromObj understands v2 objects', () => {
    expect(rootFromObj(TEST_OBJ_V2)).toEqual(TEST_ROOT_5)
});

test('rootFromObj tolerates absent sections key', () => {
    expect(rootFromObj({version: 2, videoUrl: '', changeCounter: 7, updatedAt: "2019-01-01T00:00:00.000Z"})).toEqual(
        {pageUrls: [], sections: [], version: 2, changeCounter: 7, updatedAt: new Date("2019-01-01T00:00:00.000Z"), videoUrl: ''});
});

test('rootFromObj tolerates absent sections.pageAreas and sections.pages', () => {
    expect(rootFromObj({
        version: 2,
        videoUrl: '',
        changeCounter: 7,
        updatedAt: "2019-01-01T00:00:00.000Z",
        sections: [{
            startSec: 1,
            endSec: 2,
        }]
    })).toEqual({
        pageUrls: [],
        version: 2,
        videoUrl: '',
        changeCounter: 7,
        updatedAt: new Date("2019-01-01T00:00:00.000Z"),
        sections: [{
            startSec: 1,
            endSec: 2,
            pageAreas: [],
            pageIdxs: []
        }]
    });
});

test('rootFromObj tolerates absent sections.pageAreas.areas', () => {
    expect(rootFromObj({
        version: 2,
        videoUrl: '',
        changeCounter: 7,
        updatedAt: "2019-01-01T00:00:00.000Z",
        sections: [{
            startSec: 1,
            endSec: 2,
            pageAreas: [{
                pageIdx: 1
            }]
        }]
    })).toEqual({
        pageUrls: [],
        version: 2,
        changeCounter: 7,
        updatedAt: new Date("2019-01-01T00:00:00.000Z"),
        videoUrl: '',
        sections: [{
            startSec: 1,
            endSec: 2,
            pageAreas: [{
                pageIdx: 1,
                areas: []
            }],
            pageIdxs: []
        }]
    });
});

test('rootToObj converts root to obj', () => {
    expect(rootToObj(TEST_ROOT_5)).toEqual(TEST_OBJ_V2);
});

test('rootFromObj accepts root, too!',  () => {
    expect(rootFromObj(TEST_ROOT)).toEqual(TEST_ROOT);
})

test('rootToBinaryString converts root to base64-encoded string and back', () => {
    const newRoot = rootFromBinaryString(rootToBinaryString(TEST_ROOT));
    expect(newRoot).toEqual(TEST_ROOT);
})

test('rootToBinaryString understands v1 strings', () => {
    const newRoot = rootFromBinaryString("1-BCJNGEBw38sAAAD0IAoraHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1hVG9weHd1MUtVRRI9LQDhaW1hZ2VzMi5pbWdib3gwAP8TZjgvMmIvbDY0YWJHTVJfby5qcGc/ZG93bmxvYWQ9dHJ1ZT8ACu8zYi8xYy9Vc3V0VFdHQj8AAfccGAEiJwgAEh0IABIMCOILENICGKcLINUCEgsIHBCiAxjUAyDgAhjjEiCvEykAoPQDEKADGPoHIMgpAPABMhCGBhi6BCDaAhivEyDwEwAAAAA=");
    expect(newRoot).toEqual(TEST_ROOT);
})

test('rootFromObj tolerates empty startSec and endSec', () => {
    expect(rootFromObj({
        version: 2,
        sections: [
            {
                start: 0,
                end: 0
            }
        ]
    })).toBeTruthy();
});