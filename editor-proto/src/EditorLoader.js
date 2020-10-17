
import React, { useState } from 'react';
import Editor from './editor/Editor';
import {secsToString, stringToSecs} from "./utils";

const transformToHumanReadable = (data) => {
    const transformedData = JSON.parse(JSON.stringify(data));
    transformedData.fragments.forEach(f => {
        f.start = secsToString(f.startSec);
        f.end = secsToString(f.endSec);
        delete f.startSec;
        delete f.endSec;
    });
    return transformedData;
}

const transformFromHumanReadable = (data) => {
    const transformedData = JSON.parse(JSON.stringify(data));
    transformedData.fragments.forEach(f => {
        f.startSec = stringToSecs(f.start);
        f.endSec = stringToSecs(f.end);
        delete f.start;
        delete f.end;
    });
    return transformedData;
}

function EditorLoader(initialData) {
    var [data, setData] = useState(transformFromHumanReadable(initialData));
    const handleOnDataUpdated = (newData) => {
        setData(newData);
    }

    return <div>
        <Editor {...data} onDataUpdated={handleOnDataUpdated} />
        <textarea readOnly={true} value={JSON.stringify(transformToHumanReadable(data), null, 2)} />
    </div>;
}

export default EditorLoader;