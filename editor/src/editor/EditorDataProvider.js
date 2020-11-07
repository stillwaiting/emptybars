import React, { useState } from 'react';

import './EditorDataProvider.scss';

const OP_NEW = 'new';
const OP_LOAD_OLD = 'loadOld';
const OP_RESTORE = 'restore';

export default function EditorDataProvider({ lastStateFromLocalStorage, onDataProvided}) {
    const [oldState, setOldState] = useState('');
    const [opType, setOpType] = useState('');

    const handleOnSelect = (opType) => {
        setOpType(opType);
    }

    const handleOldStateChanged = (e) => {
        setOldState(e.target.value);
    }

    const handleOnSubmit = () => {
        switch (opType) {
            case OP_LOAD_OLD:
                onDataProvided(JSON.parse(oldState));
                return;
            case OP_RESTORE:
                onDataProvided(JSON.parse(lastStateFromLocalStorage));
                return;
            default:
                alert('TBD');
        }
    }

    return <table><tbody><tr>
            <td>
                <input type='radio' name='operation' onChange={handleOnSelect.bind(this, OP_NEW)} />
                Create new
            </td>
            <td>
                <p>
                    Video URL:
                </p>
                <p>
                    <input type='text' />
                </p>
                <p>
                    Sheet music pages (one URL per line):
                </p>
                <p>
                    <textarea />
                </p>
            </td>
        </tr><tr>
            <td>
                <input type='radio' name='operation' onChange={handleOnSelect.bind(this, OP_LOAD_OLD)} />
                Load old
            </td>
            <td>
                <p>
                    Old fragments content (paste here)
                </p>
                <p>
                    <textarea onChange={handleOldStateChanged} value={oldState} />
                </p>
            </td>
        </tr>{lastStateFromLocalStorage
            ? <tr>
                <td>
                    <input type='radio' name='operation' onChange={handleOnSelect.bind(this, OP_RESTORE)} />
                    Restore previous from local storage
                </td>
                <td>
                    <a href={JSON.parse(lastStateFromLocalStorage).videoUrl} target='_blank'>{JSON.parse(lastStateFromLocalStorage).videoUrl}</a>
                </td>
            </tr>
            : ''
        }{opType ? <tr>
            <td>
                <button onClick={handleOnSubmit}>Submit</button>
            </td>
            <td></td>
        </tr> : ''}</tbody></table>;

};