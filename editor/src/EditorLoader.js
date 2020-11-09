import React, { useState, useRef } from 'react';
import Editor from './editor/Editor';
import { transformFromHumanReadable, transformToHumanReadable} from "emptybars-common/utils";

import './EditorLoader.scss';
import EditorDataProvider from "./editor/EditorDataProvider";

const LOCAL_STORAGE_KEY = 'emptybarsEditorData';

function EditorLoader(initialData) {
    var [data, setData] = useState(transformFromHumanReadable(initialData));
    var [history, setHistory] = useState([]);
    var [redo, setRedo] = useState([]);
    const textareaRef = useRef(null);

    const doSetData = (newData) => {
        setData(newData);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transformToHumanReadable(newData)));
    }


    const handleOnDataUpdated = (newData, operationName) => {
        const historyChunk = {oldData: JSON.parse(JSON.stringify(data)), newData: JSON.parse(JSON.stringify(newData)), operationName};
        doSetData(newData);

        history.push(historyChunk);
        setHistory(history);

        redo = [];
        setRedo(redo)
    }

    const handleOnDataProvided = (providedData) => {
        doSetData(transformFromHumanReadable(providedData));
    }

    const handleCopyClick = () => {
        textareaRef.current.select();
        document.execCommand('copy');
        alert('Copied!');
    }

    const handleUndo = () => {
        const undoData = history.pop();
        doSetData(undoData.oldData);

        setHistory(history);

        redo.push(undoData);
        setRedo(redo);
    }

    const handleRedo = () => {
        const redoData = redo.pop();
        doSetData(redoData.newData);

        history.push(redoData);
        setHistory(history);

        setRedo(redo);
    }

    return <div>{data.videoUrl ?
            <div className="editorLoader">
                <Editor {...data} onDataUpdated={handleOnDataUpdated}/>
                <textarea readOnly={true} value={JSON.stringify(transformToHumanReadable(data), null, 2)}
                          ref={textareaRef}/>
                <div className="copyButton" onClick={handleCopyClick}>copy</div>
                {history.length > 0
                    ? <div>
                        Last operation: {history[history.length - 1].operationName} <span className="undoButton"
                                                                                          onClick={handleUndo}>undo</span>
                    </div>
                    : ''
                }
                {redo.length > 0
                    ? <div>
                        Cancelled operation: {redo[redo.length - 1].operationName} <span className="undoButton"
                                                                                         onClick={handleRedo}>redo</span>
                    </div>
                    : ''
                }
            </div>
            :
            <EditorDataProvider lastStateFromLocalStorage={window.localStorage.getItem(LOCAL_STORAGE_KEY)} onDataProvided={handleOnDataProvided} />
    }</div>;
}

export default EditorLoader;