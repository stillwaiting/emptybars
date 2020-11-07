import React, { useState, useRef } from 'react';
import Editor from './editor/Editor';
import { transformFromHumanReadable, transformToHumanReadable} from "emptybars-common/utils";

import './EditorLoader.scss';

function EditorLoader(initialData) {
    var [data, setData] = useState(transformFromHumanReadable(initialData));
    var [history, setHistory] = useState([]);
    var [redo, setRedo] = useState([]);
    const textareaRef = useRef(null);
    const handleOnDataUpdated = (newData, operationName) => {
        const historyChunk = {oldData: JSON.parse(JSON.stringify(data)), newData: JSON.parse(JSON.stringify(newData)), operationName};
        history.push(historyChunk);
        setData(newData);
        redo = [];
        setHistory(history);
        setRedo(redo)
    }

    const handleCopyClick = () => {
        textareaRef.current.select();
        document.execCommand('copy');
        alert('Copied!');
    }

    const handleUndo = () => {
        const undoData = history.pop();
        setData(JSON.parse(JSON.stringify(undoData.oldData)));
        redo.push(undoData);
        setRedo(redo);
        setHistory(history);
    }

    const handleRedo = () => {
        const redoData = redo.pop();
        setData(JSON.parse(JSON.stringify(redoData.newData)));
        history.push(redoData);
        setRedo(redo);
        setHistory(history);
    }

    return <div className="editorLoader">
        <Editor {...data} onDataUpdated={handleOnDataUpdated} />
        <textarea readOnly={true} value={JSON.stringify(transformToHumanReadable(data), null, 2)} ref={textareaRef} />
        <div className="copyButton"  onClick={handleCopyClick}>copy</div>
        {history.length > 0
            ? <div>
                Last operation: {history[history.length - 1].operationName} <span className="undoButton" onClick={handleUndo}>undo</span>
            </div>
            : ''
        }
        {redo.length > 0
            ? <div>
                Cancelled operation: {redo[redo.length-1].operationName} <span className="undoButton" onClick={handleRedo}>redo</span>
            </div>
            : ''
        }
    </div>;
}

export default EditorLoader;