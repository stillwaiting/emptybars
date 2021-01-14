import {Root, rootFromObj} from "./root";

const testJson: any = {
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


test('rootFromObj converts JSON to model root correctly', () => {
    const root: Root = rootFromObj(testJson);

    const expectedRoot: Root = {
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
                startSec: 240.3,
                endSec: 247.9
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
                startSec: 247.9,
                endSec: 254.4
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

    expect(root).toEqual(expectedRoot);
});
