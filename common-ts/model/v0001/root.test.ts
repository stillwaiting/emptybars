import {Root, rootFromBinaryString, rootFromObj, rootToBinaryString, rootToObj} from "./root";

const TEST_OBJ_V0: any = {
    sections: [
        {
            pages: [
                "16076802714220.9626811321366975"
            ],
            pageAreas: {
                "16076802714220.9626811321366975": [
                    {
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
                    }
                ]
            },
            start: "04:00.3",
            end: "04:07.9"
        },
        {
            pages: [
                "16076802714220.9626811321366975"
            ],
            pageAreas: {
                "16076802714220.9626811321366975": [
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
            },
            start: "04:07.9",
            end: "04:14.4"
        }
    ],
    pages: [
        {
            url: "https://images2.imgbox.com/f8/2b/l64abGMR_o.jpg?download=true",
            id: "16076802714220.9626811321366975"
        },
        {
            url: "https://images2.imgbox.com/3b/1c/UsutTWGB_o.jpg?download=true",
            id: "16076802714220.35464634367609493"
        }
    ],
    videoUrl: "https://www.youtube.com/watch?v=aTopxwu1KUE"
};

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

const TEST_ROOT: Root = {
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
            startSec: 240.3,
            endSec: 247.9
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
            startSec: 247.9,
            endSec: 254.4
        }
    ],
    pageUrls: ["https://images2.imgbox.com/f8/2b/l64abGMR_o.jpg?download=true", "https://images2.imgbox.com/3b/1c/UsutTWGB_o.jpg?download=true"],
    videoUrl: "https://www.youtube.com/watch?v=aTopxwu1KUE"
};

test('rootFromObj understands v0 objects', () => {
    expect(rootFromObj(TEST_OBJ_V0)).toEqual(TEST_ROOT)
});

test('rootFromObj understands v1 objects', () => {
    expect(rootFromObj(TEST_OBJ_V1)).toEqual(TEST_ROOT)
});

test('rootFromObj tolerates absent sections key', () => {
    expect(rootFromObj({version: 1, videoUrl: ''})).toEqual({pageUrls: [], sections: [], version: 1, videoUrl: ''});
});

test('rootFromObj tolerates absent sections.pageAreas and sections.pages', () => {
    expect(rootFromObj({
        version: 1,
        videoUrl: '',
        sections: [{
            startSec: 1,
            endSec: 2,
        }]
    })).toEqual({
        pageUrls: [],
        version: 1,
        videoUrl: '',
        sections: [{
            startSec: 1,
            endSec: 2,
            pageAreas: [],
            pages: []
        }]
    });
});

test('rootFromObj tolerates absent sections.pageAreas.areas', () => {
    expect(rootFromObj({
        version: 1,
        videoUrl: '',
        sections: [{
            startSec: 1,
            endSec: 2,
            pageAreas: [{
                pageIdx: 1
            }]
        }]
    })).toEqual({
        pageUrls: [],
        version: 1,
        videoUrl: '',
        sections: [{
            startSec: 1,
            endSec: 2,
            pageAreas: [{
                pageIdx: 1,
                areas: []
            }],
            pages: []
        }]
    });
});

test('rootToObj converts root to obj', () => {
    expect(rootToObj(TEST_ROOT)).toEqual(TEST_OBJ_V1);
});

test('rootFromObj accepts root, too!',  () => {
    expect(rootFromObj(TEST_ROOT)).toEqual(TEST_ROOT);
})

test('rootToBinaryString converts root to base64-encoded string and back', () => {
    const newRoot = rootFromBinaryString(rootToBinaryString(TEST_ROOT));
    expect(newRoot).toEqual(TEST_ROOT);
})

test('rootFromObj tolerates empty startSec and endSec', () => {
    expect(rootFromObj({
        version: 1,
        sections: [
            {
                start: 0,
                end: 0
            }
        ]
    })).toBeTruthy();
});