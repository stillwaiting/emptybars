import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import { transformFromHumanReadable} from "emptybars-common/utils";

InitPlayer('playerPlaceholder', window.playerData);

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

