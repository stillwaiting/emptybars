import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import { rootFromObj } from "emptybars-common-ts/lib/model/current";
import { initSectionsPlayer } from "emptybars-common-ts/lib/initialiser";

import ImagesLoader from './ImagesLoader';
import DataProvider from './DataProvider';

initSectionsPlayer(($element, data) => {

    const doInit = ($element, data) => {

        const root = rootFromObj(data);

        const onImagesLoaded = (images) => {
            return ReactDOM.render(
                <React.StrictMode>
                    <Player images={images} {...root} />
                </React.StrictMode>,
                $element
            );
        }

        ReactDOM.render(
            <React.StrictMode>
                <ImagesLoader imageUrls={root.pageUrls} onImagesLoaded={onImagesLoaded} />
            </React.StrictMode>,
            $element
        );
    }

    if (data.videoUrl) {
        doInit($element, data);
    } else {
        ReactDOM.render(
            <React.StrictMode>
                <DataProvider onDataProvided={(data) => doInit($element, data)} />
            </React.StrictMode>,
            $element
        );
    }
});

