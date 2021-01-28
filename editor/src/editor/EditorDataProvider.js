import React, { useState, useEffect } from 'react';

import './EditorDataProvider.scss';
import {rootCurrentVersion, rootFromBinaryString, rootToObj} from "../model";

const OP_NEW = 'new';
const OP_LOAD_OLD = 'loadOld';
const OP_RESTORE = 'restore';

export default function EditorDataProvider({ lastStateFromLocalStorage, onDataObjProvided}) {
    const [oldState, setOldState] = useState('');
    const [opType, setOpType] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [pageUrls, setPageUrls] = useState('');

    useEffect(() => {
        if (window.location.hash.match(/^#[0-9]+\-.*$/))  {
            const binaryData = window.location.hash.substr(1);
            onDataObjProvided(rootToObj(rootFromBinaryString(binaryData)));
            return;
        }
    }, []);

    const handleOnSelect = (opType) => {
        setOpType(opType);
    }

    const handleOldStateChanged = (e) => {
        setOldState(e.target.value);
    }

    const handleOnVideoUrlChanged = (e) => {
        setVideoUrl(e.target.value);
    }

    const handleOnPageUrlsChanged = (e) => {
        setPageUrls(e.target.value);
    }

    const handleOnSubmit = () => {
        switch (opType) {
            case OP_LOAD_OLD:
                onDataObjProvided(JSON.parse(oldState));
                return;
            case OP_RESTORE:
                onDataObjProvided(JSON.parse(lastStateFromLocalStorage));
                return;
            case OP_NEW: {
                if (pageUrls.trim().toLocaleLowerCase().indexOf('<img') >= 0) {
                    const parsedUrls = [];
                    const regexpUrls = pageUrls.matchAll(/src\s*=\s*["']([^"']*)/g)
                    while (true) {
                        const maybeParsedUrl = regexpUrls.next();
                        if (maybeParsedUrl.done) {
                            break;
                        }
                        parsedUrls.push(maybeParsedUrl.value[1])
                    }
                    onDataObjProvided({
                        version: rootCurrentVersion(),
                        changeCounter: 0,
                        updatedAt: new Date().getTime(),
                        videoUrl,
                        sections: [],
                        pageUrls: parsedUrls
                    });
                    return;
                }
                onDataObjProvided({
                    version: rootCurrentVersion(),
                    changeCounter: 0,
                    updatedAt: new Date().getTime(),
                    videoUrl,
                    sections: [],
                    pageUrls: pageUrls.trim().split("\n").map(p => p.trim()).filter(p => p)
                });
                return
            }

            default:
                alert('TBD');
        }
    }

    return <table className='editorDataProvider'><tbody>
            <tr>
                <td className='firstCol' onClick={handleOnSelect.bind(this, OP_NEW)}>
                    <input type='radio' name='operation' onChange={handleOnSelect.bind(this, OP_NEW)} checked={opType == OP_NEW} />&nbsp;
                    Create a new
                </td>
                <td className='secondCol'>
                    <p>
                        Video URL:
                    </p>
                    <p>
                        <input type='text' onChange={handleOnVideoUrlChanged} value={videoUrl} readOnly={opType != OP_NEW} />
                    </p>
                    <p>
                        Sheet music pages (one URL per line):
                    </p>
                    <p>
                        <textarea onChange={handleOnPageUrlsChanged} value={pageUrls}  readOnly={opType != OP_NEW} />
                    </p>
                </td>
            </tr>
            <tr>
                <td className='firstCol' onClick={handleOnSelect.bind(this, OP_LOAD_OLD)}>
                    <input type='radio' name='operation' onChange={handleOnSelect.bind(this, OP_LOAD_OLD)} checked={opType == OP_LOAD_OLD} />&nbsp;
                    Load old
                </td>
                <td className='secondCol'>
                    <p>
                        Old sections content (paste here)
                    </p>
                    <p>
                        <textarea onChange={handleOldStateChanged} value={oldState} readOnly={opType != OP_LOAD_OLD} />
                    </p>
                </td>
            </tr>
            {lastStateFromLocalStorage ? <tr>
                    <td className='firstCol' onClick={handleOnSelect.bind(this, OP_RESTORE)}>
                        <input type='radio' name='operation' onChange={handleOnSelect.bind(this, OP_RESTORE)} checked={opType == OP_RESTORE}  />&nbsp;
                        Restore from local storage
                    </td>
                    <td className='secondCol'>
                        <a href={JSON.parse(lastStateFromLocalStorage).videoUrl} target='_blank'>{JSON.parse(lastStateFromLocalStorage).videoUrl}</a>
                    </td>
                </tr>
            : null
            }{opType ? <tr><td className='lastRow'>
                <button onClick={handleOnSubmit}>Continue</button>
            </td><td className='lastRow'></td></tr> : null}
        </tbody>
    </table>;

};