import React from 'react';
import ReactDOM from 'react-dom';

import EditorLoader from './EditorLoader';

InitEditor('editorPlaceholder',
    {
        "fragments": [],
        "pages": [],
        "videoUrl": "https://www.youtube.com/watch?v=RMnlu50CBb8"
    }
);


function InitEditor($element, data) {
    const {fragments, pages, videoUrl, videoTitle} = data;

    ReactDOM.render(
        <React.StrictMode>
          <EditorLoader fragments={fragments || []} pages={pages || []} videoUrl={videoUrl} />
        </React.StrictMode>,
        document.getElementById($element)
    );
}

