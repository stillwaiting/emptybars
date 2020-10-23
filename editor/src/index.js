import React from 'react';
import ReactDOM from 'react-dom';

import EditorLoader from './EditorLoader';

InitEditor('editorPlaceholder',
    {
        "fragments": [
            {
                "pages": [],
                "start": "00:0.0",
                "end": "00:10.0"
            }
        ],
        "pages": [
            {
                "url": "https://images2.imgbox.com/53/8c/z2gPCYKC_o.jpg?download=true",
                "id": "1603488067720"
            },
            {
                "url": "https://images2.imgbox.com/c0/db/OWDIpnQe_o.jpg?download=true",
                "id": "1603488076637"
            },
            {
                "url": "https://images2.imgbox.com/2b/8f/9IKD1rL7_o.jpg?download=true",
                "id": "1603488084988"
            },
            {
                "url": "https://images2.imgbox.com/3b/4a/Wqsk7RkM_o.jpg?download=true",
                "id": "1603488094313"
            }
        ],
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

