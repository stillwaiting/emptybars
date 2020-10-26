import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import {secsToString, stringToSecs, transformFromHumanReadable} from "emptybars-common/utils";

InitPlayer('playerPlaceholder',
    {
        "fragments": [
            {
                "pages": [
                    "1603271654487"
                ],
                "pageAreas": {
                    "1603271654487": [
                        {
                            "x": 319,
                            "y": 518,
                            "width": 1088,
                            "height": 469
                        }
                    ]
                },
                "start": "00:0.0",
                "end": "00:9.3"
            },
            {
                "pages": [
                    "1603271654487"
                ],
                "pageAreas": {
                    "1603271654487": [
                        {
                            "x": 1416,
                            "y": 554,
                            "width": 469,
                            "height": 433
                        },
                        {
                            "x": 178,
                            "y": 979,
                            "width": 1404,
                            "height": 416
                        }
                    ]
                },
                "start": "00:9.3",
                "end": "00:24.1"
            },
            {
                "pages": [
                    "1603271654487"
                ],
                "pageAreas": {
                    "1603271654487": [
                        {
                            "x": 1578,
                            "y": 995,
                            "width": 323,
                            "height": 400
                        },
                        {
                            "x": 153,
                            "y": 1400,
                            "width": 477,
                            "height": 437
                        }
                    ]
                },
                "start": "00:24.1",
                "end": "00:31.0"
            },
            {
                "pages": [
                    "1603271654487"
                ],
                "pageAreas": {
                    "1603271654487": [
                        {
                            "x": 631,
                            "y": 1404,
                            "width": 1250,
                            "height": 441
                        },
                        {
                            "x": 145,
                            "y": 1849,
                            "width": 813,
                            "height": 485
                        }
                    ]
                },
                "start": "00:31.0",
                "end": "00:46.9"
            },
            {
                "pages": [
                    "1603271654487",
                    "1603271662914"
                ],
                "pageAreas": {
                    "1603271654487": [
                        {
                            "x": 967,
                            "y": 1882,
                            "width": 874,
                            "height": 453
                        }
                    ]
                },
                "start": "00:46.9",
                "end": "00:56.9"
            },
            {
                "pages": [
                    "1603271662914"
                ],
                "pageAreas": {
                    "1603271662914": [
                        {
                            "x": 161,
                            "y": 60,
                            "width": 1732,
                            "height": 497
                        },
                        {
                            "x": 174,
                            "y": 558,
                            "width": 720,
                            "height": 449
                        }
                    ]
                },
                "start": "00:56.9",
                "end": "01:13.5"
            },
            {
                "pages": [
                    "1603271662914"
                ],
                "pageAreas": {
                    "1603271662914": [
                        {
                            "x": 894,
                            "y": 562,
                            "width": 987,
                            "height": 449
                        },
                        {
                            "x": 170,
                            "y": 1080,
                            "width": 408,
                            "height": 348
                        }
                    ]
                },
                "start": "01:13.5",
                "end": "01:26.8"
            },
            {
                "pages": [
                    "1603271662914"
                ],
                "pageAreas": {
                    "1603271662914": [
                        {
                            "x": 578,
                            "y": 1028,
                            "width": 1287,
                            "height": 408
                        },
                        {
                            "x": 178,
                            "y": 1424,
                            "width": 1173,
                            "height": 437
                        }
                    ]
                },
                "start": "01:26.8",
                "end": "01:43.7"
            },
            {
                "pages": [
                    "1603271662914"
                ],
                "pageAreas": {
                    "1603271662914": [
                        {
                            "x": 1335,
                            "y": 1432,
                            "width": 566,
                            "height": 429
                        },
                        {
                            "x": 178,
                            "y": 1862,
                            "width": 817,
                            "height": 481
                        }
                    ]
                },
                "start": "01:43.7",
                "end": "01:54.7"
            },
            {
                "pages": [
                    "1603271662914",
                    "1603271678125"
                ],
                "pageAreas": {
                    "1603271662914": [
                        {
                            "x": 1007,
                            "y": 1862,
                            "width": 825,
                            "height": 493
                        }
                    ]
                },
                "start": "01:54.7",
                "end": "02:3.7"
            },
            {
                "pages": [
                    "1603271678125"
                ],
                "pageAreas": {
                    "1603271678125": [
                        {
                            "x": 178,
                            "y": 101,
                            "width": 1109,
                            "height": 526
                        }
                    ]
                },
                "start": "02:3.7",
                "end": "02:13.0"
            },
            {
                "pages": [
                    "1603271678125"
                ],
                "pageAreas": {
                    "1603271678125": [
                        {
                            "x": 1299,
                            "y": 170,
                            "width": 554,
                            "height": 433
                        },
                        {
                            "x": 178,
                            "y": 643,
                            "width": 1837,
                            "height": 412
                        },
                        {
                            "x": 194,
                            "y": 1032,
                            "width": 416,
                            "height": 416
                        }
                    ]
                },
                "start": "02:13.0",
                "end": "02:34.7"
            },
            {
                "pages": [
                    "1603271678125"
                ],
                "pageAreas": {
                    "1603271678125": [
                        {
                            "x": 619,
                            "y": 1028,
                            "width": 1283,
                            "height": 429
                        },
                        {
                            "x": 186,
                            "y": 1485,
                            "width": 615,
                            "height": 416
                        }
                    ]
                },
                "start": "02:34.7",
                "end": "02:50.4"
            },
            {
                "pages": [
                    "1603271678125"
                ],
                "pageAreas": {
                    "1603271678125": [
                        {
                            "x": 805,
                            "y": 1485,
                            "width": 562,
                            "height": 445
                        }
                    ]
                },
                "start": "02:50.4",
                "end": "03:2.1"
            },
            {
                "pages": [
                    "1603271678125"
                ],
                "pageAreas": {
                    "1603271678125": [
                        {
                            "x": 1368,
                            "y": 1485,
                            "width": 501,
                            "height": 429
                        },
                        {
                            "x": 1594,
                            "y": 1971,
                            "width": -1420,
                            "height": 477
                        }
                    ]
                },
                "start": "03:2.1",
                "end": "03:19.9"
            },
            {
                "pages": [
                    "1603271678125",
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271678125": [
                        {
                            "x": 1603,
                            "y": 1963,
                            "width": 279,
                            "height": 352
                        }
                    ],
                    "1603271687695": [
                        {
                            "x": 1024,
                            "y": 113,
                            "width": -898,
                            "height": 457
                        }
                    ]
                },
                "start": "03:19.9",
                "end": "03:25.4"
            },
            {
                "pages": [
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271687695": [
                        {
                            "x": 1020,
                            "y": 141,
                            "width": 890,
                            "height": 408
                        },
                        {
                            "x": 174,
                            "y": 566,
                            "width": 1145,
                            "height": 489
                        }
                    ]
                },
                "start": "03:25.4",
                "end": "03:45.8"
            },
            {
                "pages": [
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271687695": [
                        {
                            "x": 1331,
                            "y": 538,
                            "width": 538,
                            "height": 489
                        },
                        {
                            "x": 182,
                            "y": 991,
                            "width": 534,
                            "height": 445
                        }
                    ]
                },
                "start": "03:45.8",
                "end": "03:53.1"
            },
            {
                "pages": [
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271687695": [
                        {
                            "x": 708,
                            "y": 1040,
                            "width": 1097,
                            "height": 404
                        }
                    ]
                },
                "start": "03:53.1",
                "end": "04:4.4"
            },
            {
                "pages": [
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271687695": [
                        {
                            "x": 1938,
                            "y": 1210,
                            "width": 0,
                            "height": 0
                        },
                        {
                            "x": 1793,
                            "y": 1056,
                            "width": 125,
                            "height": 392
                        },
                        {
                            "x": 186,
                            "y": 1424,
                            "width": 1016,
                            "height": 465
                        }
                    ]
                },
                "start": "04:4.4",
                "end": "04:10.8"
            },
            {
                "pages": [
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271687695": [
                        {
                            "x": 1194,
                            "y": 1437,
                            "width": 688,
                            "height": 469
                        },
                        {
                            "x": 157,
                            "y": 1870,
                            "width": 360,
                            "height": 481
                        }
                    ]
                },
                "start": "04:10.3",
                "end": "04:19.1"
            },
            {
                "pages": [
                    "1603271687695"
                ],
                "pageAreas": {
                    "1603271687695": [
                        {
                            "x": 485,
                            "y": 1882,
                            "width": 1534,
                            "height": 469
                        }
                    ]
                },
                "start": "04:19.1",
                "end": "04:32.1"
            },
            {
                "pages": [
                    "1603271699635"
                ],
                "start": "04:32.1",
                "end": "04:42.3"
            },
            {
                "pages": [
                    "1603271699635"
                ],
                "pageAreas": {
                    "1603271699635": [
                        {
                            "x": 165,
                            "y": 611,
                            "width": 1736,
                            "height": 412
                        },
                        {
                            "x": 178,
                            "y": 1003,
                            "width": 1295,
                            "height": 412
                        }
                    ]
                },
                "start": "04:42.3",
                "end": "04:56.7"
            },
            {
                "pages": [
                    "1603271699635"
                ],
                "start": "04:56.7",
                "end": "05:3.6"
            },
            {
                "pages": [
                    "1603271699635"
                ],
                "pageAreas": {
                    "1603271699635": [
                        {
                            "x": 615,
                            "y": 1445,
                            "width": 1230,
                            "height": 425
                        },
                        {
                            "x": 825,
                            "y": 2283,
                            "width": -663,
                            "height": -425
                        }
                    ]
                },
                "start": "05:3.1",
                "end": "05:19.5"
            },
            {
                "pages": [
                    "1603271699635"
                ],
                "pageAreas": {
                    "1603271699635": [
                        {
                            "x": 841,
                            "y": 1890,
                            "width": 995,
                            "height": 485
                        }
                    ]
                },
                "start": "05:19.5",
                "end": "05:43.9"
            }
        ],
        "pages": [
            {
                "url": "https://images2.imgbox.com/49/e9/atRCuuan_o.jpg?download=true",
                "id": "1603271654487"
            },
            {
                "url": "https://images2.imgbox.com/5d/5c/gZaVgNaz_o.jpg?download=true",
                "id": "1603271662914"
            },
            {
                "url": "https://images2.imgbox.com/24/49/3myY9snE_o.jpg?download=true",
                "id": "1603271678125"
            },
            {
                "url": "https://images2.imgbox.com/f4/c7/sxCtns06_o.jpg?download=true",
                "id": "1603271687695"
            },
            {
                "url": "https://images2.imgbox.com/5e/28/rRlWCVG5_o.jpg?download=true",
                "id": "1603271699635"
            }
        ],
        "videoUrl": "https://www.youtube.com/watch?v=3tQs6l4d8hM"
    }
);


function InitPlayer($element, data) {

    var imagesCount = 0;
    const images = [];
    document.getElementById($element).innerText = "Loading, please wait...";

    const setImageLoaded = (error) => {
        imagesCount += 1;

        if (imagesCount == data.pages.length) {
            ReactDOM.render(
                <React.StrictMode>
                    <Player images={images} {...transformFromHumanReadable(data)} />
                </React.StrictMode>,
                document.getElementById($element)
            );
        }
    };

    data.pages.forEach((page, pageIdx) => {
        const image = new Image();
        image.src=page.url;
        image.onload = () => { setImageLoaded() }
        image.onerror = (e) => { console.error(e); setImageLoaded() }
        images.push(image);
    });
}

