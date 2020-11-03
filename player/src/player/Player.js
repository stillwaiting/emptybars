import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Fragments from './Fragments';

import FragmentPages from "./FragmentPages";

import './Player.scss';

function Player({ fragments, images, pages, videoUrl }) {
    const [activeFragments, setActiveFragments] = useState([]);
    const [initialised, setInitialised] = useState(false)
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);

    const $player = useRef(null);

    const handlePlayInterval = (from, until) => {
        $player.current.playFragment(from, until)
    };

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
        var newActiveFragments = [];
        fragments.forEach((fragment, idx) => {
            if (fragment.startSec <= playedSeconds && fragment.endSec >= playedSeconds) {
                newActiveFragments.push(idx);
            }
        });
        setActiveFragments(newActiveFragments);
    };

    const onPlay = () => {
        setInitialised(true)
    }

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
            <div className={initialised ? 'player' : 'player notInitialised'}>
                <div className='fragmentPages'>
                    <FragmentPages
                        images={images}
                        pages={pages || []}
                        fragmentPages={getActivePages()}
                        fragmentPageAreas={getActivePageAreas()}
                        />
                </div>

                <div className='playerAndFragments'>
                    <ReactPlayerWrapper videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} onPlay={onPlay} />
                    <Fragments fragments={fragments} playInterval={handlePlayInterval} activeFragments={activeFragments}/>
                </div>

            </div>
    );
}

export default Player;
