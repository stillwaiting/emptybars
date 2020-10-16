
import React, { useState, useRef, useEffect } from 'react';
import Editor from './Editor';
import PagesList from "./PagesList";

function EditorLoader(initialData) {
    var [data, setData] = useState(initialData);
    const handleOnDataUpdated = (newData) => {
        setData(newData);
    }

    return <div>
        <Editor {...initialData} onDataUpdated={handleOnDataUpdated} />
        <textarea readOnly={true} value={JSON.stringify(data, null, 3)} />
    </div>;
}

export default EditorLoader;