import React, { useState, useRef,  useEffect } from "react";
import Editor from "./editor/Editor";

import "./EditorLoader.scss";
import EditorDataProvider from "./editor/EditorDataProvider";

import {rootFromObj,rootToObj} from './model'
import {rootToBinaryString,rootCurrentVersion } from "./model";

import {AnchorManager} from "emptybars-common-ts/lib/anchormanager";

const LOCAL_STORAGE_KEY = "emptybarsEditorData";

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function EditorLoader(initialData) {
  var [data, setData] = useState(rootFromObj(initialData));
  var [history, setHistory] = useState([]);
  var [redo, setRedo] = useState([]);
  var [showCookies, setShowCookies] = useState(true);
  const textareaRef = useRef(null);
  const [anchorManager, setAnchorManager] = useState(null);
  var [originalTitle, setOriginalTitle] = useState(false);
  if (!originalTitle) {
    originalTitle = document.title;
    setOriginalTitle(document.title);
  }

  const doSetData = (newData) => {
    // TODO: remove explicit version setup once  editor and  player are migrated to TypeScript
    newData.version = rootCurrentVersion();
    newData.changeCounter = newData.changeCounter || (
        (data && data.changeCounter)
              ? (data.changeCounter + 1) : 1
    );
    newData.updatedAt = newData.updatedAt || new Date();

    setData(newData);
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(rootToObj(newData))
    );

    document.title =
        pad(parseInt(newData.changeCounter/1000), 3) + "." +
        pad(newData.changeCounter % 1000, 3) +  " | "  +
        newData.updatedAt.toLocaleString() + " | " +
        originalTitle;

    if (anchorManager) {
      anchorManager.setAnchor('#' + rootToBinaryString(rootFromObj(newData)));
    }
  };

  useEffect(() => {
    setAnchorManager(new AnchorManager());
  }, []);

  const handleOnDataUpdated = (newData, operationName) => {
    // TODO: remove explicit version setup once  editor and  player are migrated to TypeScript
    const historyChunk = {
      oldData: JSON.parse(JSON.stringify(data)),
      newData: JSON.parse(JSON.stringify(newData)),
      operationName,
    };
    doSetData(newData);

    history.push(historyChunk);
    setHistory(history);

    redo = [];
    setRedo(redo);
  };

  const handleOnDataProvided = (providedData) => {
    doSetData(rootFromObj(providedData));
  };

  const handleCopyClick = () => {
    textareaRef.current.select();
    document.execCommand("copy");
    alert("Copied!");
  };

  const handleUndo = () => {
    const undoData = history.pop();
    doSetData(undoData.oldData);

    setHistory(history);

    redo.push(undoData);
    setRedo(redo);
  };

  const handleRedo = () => {
    const redoData = redo.pop();
    doSetData(redoData.newData);

    history.push(redoData);
    setHistory(history);

    setRedo(redo);
  };

  const closeCookies = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    setShowCookies(false);
  };

  return (
    <div>
      {showCookies ? (
        <div
          style={{
            border: "1px solid #999",
            display: "table",
            padding: "10px",
            margin: "auto",
          }}
        >
          By using the editor, you agree and accept the website's{" "}
          <a href="/cookies">cookies policy</a>.<br />
          <br />
          <strong>
            <a href="" onClick={closeCookies}>
              Close
            </a>{" "}
            <br />
          </strong>
          <a href="https://www.youtube.com/watch?v=9E6b3swbnWg&list=PLz9q8tuDHcRfQ--1tUrZj4xC1pShtz9cD">
            Let me out!
          </a>
        </div>
      ) : null}

      {data.videoUrl ? (
        <div className="editorLoader">
          <div className="editorLoaderWrapper">
            <Editor {...data} onDataUpdated={handleOnDataUpdated} />

            <div className="jsonData">
              <textarea
                readOnly={true}
                value={JSON.stringify(rootToObj(data), null, 2)}
                ref={textareaRef}
              />
              <div className="copyButton" onClick={handleCopyClick}>
                copy
              </div>
            </div>
            {history.length > 0 ? (
              <div>
                Last operation: {history[history.length - 1].operationName}{" "}
                <span className="undoButton" onClick={handleUndo}>
                  undo
                </span>
              </div>
            ) : (
              ""
            )}
            {redo.length > 0 ? (
              <div>
                Cancelled operation: {redo[redo.length - 1].operationName}{" "}
                <span className="undoButton" onClick={handleRedo}>
                  redo
                </span>
              </div>
            ) : (
              ""
            )}

            <div style={{ width: "1px", height: "1px", overflow: "hidden" }}>
              {data.pageUrls.map((pageUrl, idx) => (
                <img src={pageUrl} key={idx} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EditorDataProvider
          lastStateFromLocalStorage={window.localStorage.getItem(
            LOCAL_STORAGE_KEY
          )}
          onDataProvided={handleOnDataProvided}
        />
      )}
    </div>
  );
}

export default EditorLoader;
