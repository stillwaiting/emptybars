import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import { transformFromHumanReadable} from "emptybars-common/utils";

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

    var imagesCount = 0;
    const images = [];
    $element.innerText = "Loading, please wait...";

    const setImageLoaded = () => {

        imagesCount += 1;

        if (imagesCount >= data.pages.length) {
            ReactDOM.render(
                <React.StrictMode>
                    <Player images={images} {...transformFromHumanReadable(data)} />
                </React.StrictMode>,
                $element
            );
        }
    };

    if (data.pages.length == 0) {
        setImageLoaded();
    }

    data.pages.forEach((page, pageIdx) => {
        const image = new Image();
        image.src=page.url;
        image.onload = () => { setImageLoaded() }
        image.onerror = (e) => { console.error(e); setImageLoaded() }
        images.push(image);
    });
}

