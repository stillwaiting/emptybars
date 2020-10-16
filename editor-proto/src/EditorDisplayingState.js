
import React, { useState } from 'react';
import Editor from './editor/Editor';

function EditorDisplayingState(initialData) {
    var [data, setData] = useState(initialData);
    const handleOnDataUpdated = (newData) => {
        setData(newData);
    }

    return <div>
        <Editor {...initialData} onDataUpdated={handleOnDataUpdated} />
        <textarea readOnly={true} value={JSON.stringify(data, null, 3)} />
    </div>;
}

export default EditorDisplayingState;