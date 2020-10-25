import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Fragments from './Fragments';

import FragmentPages from "./FragmentPages";

import './Player.css';

function Player({ fragments, pages, videoUrl, onDataUpdated }) {
    const [activeFragments, setActiveFragments] = useState([]);
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);

    const $player = useRef(null);

    const handleFragmentSelected = (fragmentIdx) => {
        setActiveFragments([fragmentIdx]);
        $player.current.playFragment(fragments[fragmentIdx].startSec, fragments[fragmentIdx].endSec)
    };

    const handleOnPagesUpdated = (pages) => {
        onDataUpdated({ fragments, pages, videoUrl });
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
    };

    const getActivePages = () => {
        var activePages = [];
        activeFragments.forEach(fragmentIdx => {
            activePages = activePages.concat(fragments[fragmentIdx].pages);
        });
        return activePages;
    }

    const getActivePageAreas = () => {
        var areas = {};
        activeFragments.forEach(fragmentIdx => {
            for (const pageId in fragments[fragmentIdx].pageAreas) {
                const pageAreas = fragments[fragmentIdx].pageAreas[pageId];
                if (areas[pageId]) {
                    areas[pageId] = areas[pageId].concat(pageAreas)
                } else {
                    areas[pageId] = pageAreas;
                }
            }
        });
        return areas;
    }

    return (
            <div className='editor'>
                <div>
                    <ReactPlayerWrapper videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} />

                    {activeFragments.length >= 0
                        ?
                        <div>
                            <FragmentPages
                                pages={pages || []}
                                fragmentPages={getActivePages()}
                                fragmentPageAreas={getActivePageAreas()}
                            />
                        </div>
                        : ''
                    }

                </div>

                <Fragments fragments={fragments} onFragmentSelected={handleFragmentSelected} activeFragments={activeFragments}/>

            </div>
    );
}

export default Player;