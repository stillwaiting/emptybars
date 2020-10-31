import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import { transformFromHumanReadable} from "emptybars-common/utils";

import ImagesLoader from './ImagesLoader';

window.fragmentsPlayer = {
    initialized: false,
    interval: false
};

window.fragmentsPlayer.interval = setInterval(() => {
    if (document.getElementById('playerData')) {
        if (window.fragmentsPlayer.initialized) {
            clearInterval(window.fragmentsPlayer.interval);
            window.location.reload();
            return;
        }
        window.fragmentsPlayer.initialized = true;
        const data = JSON.parse(document.getElementById('playerData').innerHTML);
        const parent = document.getElementById('playerData').parentNode;
        document.getElementById('playerData').remove();
        InitPlayer(parent, data);
    }
}, 100);

function InitPlayer($element, data) {

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
}

