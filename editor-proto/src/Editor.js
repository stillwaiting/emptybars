import React, { useState, useRef, useEffect } from 'react';
import PlayerWithNavButtons from './PlayerWithNavButtons';
import FragmentPosEditor from './FragmentPosEditor';
import FragmentsListEditor from './FragmentsListEditor';
import { secsToString } from "./utils";

import './Player.css';
import PagesList from "./PagesList";
import FragmentPagesSelector from "./FragmentPagesSelector";

function Editor({ fragments, pages, videoUrl, onDataUpdated }) {
    const [currentFragmentIdx, setCurrentFragmentIdx] = useState(-1);
    const [videoPlayerPos, setVideoPlayerPos] = useState(0);

    const $player = useRef(null);

    const handleFragmentSelected = (fragmentIdx) => {
        setCurrentFragmentIdx(fragmentIdx);
        $player.current.seekToAndStop(fragments[fragmentIdx].startSec)
    };

    const handleOnPagesUpdated = (pages) => {
        onDataUpdated({ fragments, pages, videoUrl });
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPos(parseFloat(playedSeconds.toFixed(1)));
    };

    const onFragmentChanged = (updatedFragment) => {
        fragments[currentFragmentIdx] = updatedFragment;
        onDataUpdated({ fragments, pages, videoUrl });
    };

    const onFragmentsChanged = (newFragments) => {
        onDataUpdated({ fragments: newFragments, pages, videoUrl });
    }

    const onFragmentPagesChanged = (currentFragmentSelectedPages) => {
        fragments[currentFragmentIdx].pages = currentFragmentSelectedPages;
        onDataUpdated({ fragments, pages, videoUrl });
    };

    const onFragmentPageAreasChanged = (currentFragmentPageAreas) => {
        fragments[currentFragmentIdx].pageAreas = currentFragmentPageAreas;
        onDataUpdated({ fragments, pages, videoUrl });
    };

    return (
        <div>
            <div className='app'>
                <div className='app__B'>
                    <PlayerWithNavButtons videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} />
                </div>

                <div className='app__C'>
                        <PagesList pages={pages} onPagesUpdated={handleOnPagesUpdated} />
                </div>

                <div className='app__C'>
                    <FragmentsListEditor fragments={fragments} onFragmentSelected={handleFragmentSelected} onFragmentsChanged={onFragmentsChanged} />
                </div>
            </div>

            {currentFragmentIdx >= 0
                ?
                <div>
                    <FragmentPosEditor $player={$player.current} fragment={fragments[currentFragmentIdx]} onFragmentChanged={onFragmentChanged} progress={videoPlayerPos} />
                    <FragmentPagesSelector pages={pages}
                                           fragmentPages={fragments[currentFragmentIdx].pages || {}}
                                           fragmentPageAreas={fragments[currentFragmentIdx].pageAreas || {}}
                                           onFragmentPagesChanges={onFragmentPagesChanged}
                                           onFragmentPageAreasChanged={onFragmentPageAreasChanged}
                    />
                </div>
                : ''
            }
        </div>
    );
}

export default Editor;
