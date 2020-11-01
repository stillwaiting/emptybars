import React from 'react';
import ReactDOM from 'react-dom';

import EditorLoader from './EditorLoader';

import {initFragmentsPlayer} from "emptybars-common/initialiser";

initFragmentsPlayer(($element, data) => {
    const {fragments, pages, videoUrl, videoTitle} = data;

    ReactDOM.render(
        <React.StrictMode>
          <EditorLoader fragments={fragments || []} pages={pages || []} videoUrl={videoUrl} />
        </React.StrictMode>,
        $element
    );
});

