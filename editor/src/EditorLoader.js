import React, { useState, useRef } from 'react';
import Editor from './editor/Editor';
import { transformFromHumanReadable, transformToHumanReadable} from "emptybars-common/utils";

import './EditorLoader.scss';

function EditorLoader(initialData) {
    var [data, setData] = useState(transformFromHumanReadable(initialData));
    const textareaRef = useRef(null);
    const handleOnDataUpdated = (newData) => {
        setData(newData);
    }

    const handleCopyClick = () => {
        textareaRef.current.select();
        document.execCommand('copy');
        alert('Copied!');
    }

    return <div className="editorLoader">
        <Editor {...data} onDataUpdated={handleOnDataUpdated} />
        <textarea readOnly={true} value={JSON.stringify(transformToHumanReadable(data), null, 2)} ref={textareaRef} />
        <div className="copyButton"  onClick={handleCopyClick}>copy</div>
    </div>;
}

export default EditorLoader;