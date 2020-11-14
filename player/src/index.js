import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import { transformFromHumanReadable} from "emptybars-common/utils";
import { initSectionsPlayer } from "emptybars-common/initialiser";

import ImagesLoader from './ImagesLoader';

initSectionsPlayer(($element, data) => {

    const onImagesLoaded = (images) => {
        return ReactDOM.render(
                    <React.StrictMode>
                        <Player images={images} {...transformFromHumanReadable(data)} />
                    </React.StrictMode>,
                    $element
                );
    }

    ReactDOM.render(
        <React.StrictMode>
            <ImagesLoader imageUrls={data.pages.map(p => p.url)} onImagesLoaded={onImagesLoaded} />
        </React.StrictMode>,
        $element
    );
});

