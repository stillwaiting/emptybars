import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { secsToString } from 'emptybars-common/utils'

import './ReactPlayerWrapper.scss';

class ReactPlayerWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: -1,
            duration: -1,
            gotoAfterStopSec: -1,
            endSec: -1,
            playing: true,
        };
        this.$player = React.createRef();
    }

    _handleDuration(duration) {
        this.setState({duration: duration});
    }

    _stopAndReturn() {
        const gotoAfterStopSec = this.state.gotoAfterStopSec;
        this.setState({
            endSec: -1,
            gotoAfterStopSec: -1,
            playing: false
        });
        this.$player.current.seekTo(gotoAfterStopSec, 'seconds');
    }

    _handleProgress({ playedSeconds }) {
        if (this.state.endSec > 0 && playedSeconds > this.state.endSec) {
            this._stopAndReturn();
        }
        this.setState({progress: playedSeconds});
        this.props.onProgressUpdate(playedSeconds);
    };

    _handleOnPlay() {
        this.setState({playing: true});
    }

    _handleStop() {
        this.setState({playing: false});
    }

    playFragment(startSec, endSec, mode) {
        this.$player.current.seekTo(startSec, 'seconds');
        this.setState({
            // TODO: remove magic strings
            gotoAfterStopSec: Math.max(mode === 'STAY_AT_END' ? endSec : startSec, 0),
            endSec: Math.max(endSec, 0.01),
            playing: true
        });
    }

    render() {
            return (
                <div className='playWithNavButtons'>
                    <ReactPlayer
                        ref={this.$player}
                        url={this.props.videoUrl}
                        width='100%'
                        height='100%'
                        onDuration={this._handleDuration.bind(this)}
                        onProgress={this._handleProgress.bind(this)}
                        onPlay={this._handleOnPlay.bind(this)}
                        progressInterval={100}
                        onPause={this._handleStop.bind(this)}
                        onEnded={this._handleStop.bind(this)}
                        playing={this.state.playing}
                        controls={true}
                        config={{
                            youtube: {
                                playerVars: {origin: window.location.origin}
                            }
                        }}
                    />
                    <div className='positionAndControls'>
                        Current position: <span className='position'>{secsToString(this.state.progress)}</span>
                    </div>
                </div>
            );
    }
}

export default ReactPlayerWrapper;