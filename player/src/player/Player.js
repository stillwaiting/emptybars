import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Fragments from './Fragments';

import FragmentPages from "./FragmentPages";

import './Player.scss';

function Player({ fragments, images, pages, videoUrl }) {
    const [activeFragments, setActiveFragments] = useState([]);
    const [initialised, setInitialised] = useState(false)
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);
    const [playInput, setPlayInput] = useState("");

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

    const fragmentContainsPoint = (pageAreas, posX, posY) => {
        for (var areaIdx = 0; areaIdx < pageAreas.length; areaIdx++) {
            const {x, y, width, height} = pageAreas[areaIdx];
            const x2 = x + width;
            const y2 = y + height;
            if (posX > Math.min(x, x2) && posX < Math.max(x, x2) && posY > Math.min(y, y2) && posY < Math.max(y, y2)) {
                return true;
            }
        }
        return false;
    }

    const onPageClicked = (pageUid, pageX, pageY) => {
        for (var fragmentIdx = 0 ; fragmentIdx < fragments.length; fragmentIdx ++) {
            const fragment = fragments[fragmentIdx];
            if (fragmentContainsPoint(fragment.pageAreas[pageUid] || [], pageX, pageY)) {
                setPlayInput((fragmentIdx + 1) + ':' + (fragmentIdx + 1));
                handlePlayInterval(fragment.startSec, fragment.endSec);
                return;
            }
        }
    }

    return (
            <div className={initialised ? 'player' : 'player notInitialised'}>
                <div className='fragmentPagesWrapper'>
                    <FragmentPages
                        images={images}
                        pages={pages || []}
                        onPageClicked={onPageClicked}
                        fragmentPages={getActivePages()}
                        fragmentPageAreas={getActivePageAreas()}
                        />
                </div>

                <div className='playerAndFragments'>
                    <ReactPlayerWrapper videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} onPlay={onPlay} />
                    <Fragments fragments={fragments} playInterval={handlePlayInterval} activeFragments={activeFragments} playInput={playInput} setPlayInput={setPlayInput}/>
                </div>

            </div>
    );
}

export default Player;
