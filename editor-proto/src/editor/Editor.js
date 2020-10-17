import React, { useState, useRef } from 'react';
import PlayerWithNavButtons from '../PlayerWithNavButtons';
import FragmentPosition from './FragmentPosition';
import Fragments from './Fragments';

import Pages from "./Pages";
import FragmentPages from "./FragmentPages";

import './Editor.css';

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
                        <Pages pages={pages || []} onPagesUpdated={handleOnPagesUpdated} />
                </div>

                <Fragments fragments={fragments} onFragmentSelected={handleFragmentSelected} onFragmentsChanged={onFragmentsChanged} />
            </div>

            {currentFragmentIdx >= 0
                ?
                <div>
                    <FragmentPosition $player={$player.current} fragment={fragments[currentFragmentIdx]} onFragmentChanged={onFragmentChanged} progress={videoPlayerPos} />
                    <FragmentPages pages={pages || []}
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
