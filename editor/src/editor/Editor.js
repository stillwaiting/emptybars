import React, { useState, useRef } from 'react';
import PlayerWithNavButtons from '../PlayerWithNavButtons';
import FragmentPosition from './FragmentPosition';
import Fragments from './Fragments';

import Pages from "./Pages";
import FragmentPages from "./FragmentPages";

import './Editor.css';

function Editor({ fragments, pages, videoUrl, onDataUpdated }) {
    var [currentFragmentIdx, setCurrentFragmentIdx] = useState(-1);
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);

    const $player = useRef(null);

    if (currentFragmentIdx >= fragments.length) {
        currentFragmentIdx = -1;
        setCurrentFragmentIdx(-1);
    }

    const handleFragmentSelected = (fragmentIdx, fragment) => {
        setCurrentFragmentIdx(fragmentIdx);
        $player.current.seekToAndStop(fragment.startSec)
    };

    const handleOnPagesUpdated = (pages, message) => {
        onDataUpdated({ fragments, pages, videoUrl }, message);
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
    };

    const onFragmentChanged = (updatedFragment, newFragment, message) => {
        const newFragments = JSON.parse(JSON.stringify(fragments));
        newFragments[currentFragmentIdx] = updatedFragment;
        if (newFragment) {
            newFragments.splice(currentFragmentIdx + 1, 0, newFragment);
        }
        onDataUpdated({ fragments: newFragments, pages, videoUrl }, message);
    };

    const onFragmentsChanged = (newFragments, message) => {
        onDataUpdated({ fragments: newFragments, pages, videoUrl }, message);
    }

    const onFragmentPagesChanged = (currentFragmentSelectedPages, message) => {
        const newFragments = JSON.parse(JSON.stringify(fragments));
        newFragments[currentFragmentIdx].pages = currentFragmentSelectedPages;
        onDataUpdated({ fragments: newFragments, pages, videoUrl }, message);
    };

    const onFragmentPageAreasChanged = (currentFragmentPageAreas, message) => {
        const newFragments = JSON.parse(JSON.stringify(fragments));
        newFragments[currentFragmentIdx].pageAreas = currentFragmentPageAreas;
        onDataUpdated({ fragments: newFragments, pages, videoUrl }, message);
    };

    const getPrevFragmentEndSec = () => {
        if (currentFragmentIdx == 0) {
            return 0;
        }
        return fragments[currentFragmentIdx-1].endSec;
    }

    return (
            <div className='editor'>
                <div>
                    <PlayerWithNavButtons videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} />

                    {currentFragmentIdx >= 0
                        ?
                        <div>
                            <FragmentPosition
                                $player={$player.current}
                                fragment={fragments[currentFragmentIdx]}
                                fragmentIdx={currentFragmentIdx}
                                onFragmentChanged={onFragmentChanged}
                                videoPlayerPosSecs={videoPlayerPosSecs}
                                getPrevFragmentEndSec={getPrevFragmentEndSec}
                            />
                            <FragmentPages
                                pages={pages || []}
                                fragmentPages={fragments[currentFragmentIdx].pages || []}
                                fragmentPageAreas={fragments[currentFragmentIdx].pageAreas || {}}
                                onFragmentPagesChanges={onFragmentPagesChanged}
                                onFragmentPageAreasChanged={onFragmentPageAreasChanged}
                            />
                        </div>
                        : ''
                    }

                </div>

                <Fragments fragments={fragments} onFragmentSelected={handleFragmentSelected} onFragmentsChanged={onFragmentsChanged} />

                <Pages pages={pages || []} onPagesUpdated={handleOnPagesUpdated} />

            </div>
    );
}

export default Editor;
