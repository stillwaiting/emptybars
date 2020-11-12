import React from 'react';
import ReactDOM from 'react-dom';

import EditorLoader from './EditorLoader';

import {initSegmentsPlayer} from "emptybars-common/initialiser";

initSegmentsPlayer(($element, data) => {

    const {segments, pages, videoUrl, videoTitle} = data;

    ReactDOM.render(
        <React.StrictMode>
          <EditorLoader segments={segments || []} pages={pages || []} videoUrl={videoUrl} />
        </React.StrictMode>,
        $element
    );
});

