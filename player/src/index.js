import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player/Player';
import { transformFromHumanReadable} from "emptybars-common/utils";
import { initSectionsPlayer } from "emptybars-common/initialiser";

import ImagesLoader from './ImagesLoader';
import DataProvider from './DataProvider';

import Migrator from 'emptybars-common/migrator'
const migrator = new Migrator()

initSectionsPlayer(($element, data) => {

    const doInit = ($element, data) => {

        const migratedData = migrator.applyAllMigrationsToObject(data)

        const onImagesLoaded = (images) => {
            return ReactDOM.render(
                <React.StrictMode>
                    <Player images={images} {...transformFromHumanReadable(migratedData)} />
                </React.StrictMode>,
                $element
            );
        }

        ReactDOM.render(
            <React.StrictMode>
                <ImagesLoader imageUrls={migratedData.pageUrls} onImagesLoaded={onImagesLoaded}/>
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

