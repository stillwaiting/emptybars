import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { secsToString } from './utils'
import './Editor.css';

class PlayerWithNavButtons extends React.Component {

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

    handleDuration(duration) {
        this.setState({duration: duration});
    }

    stopAndReturn() {
        const gotoAfterStopSec = this.state.gotoAfterStopSec;
        this.setState({
            endSec: -1,
            gotoAfterStopSec: -1,
            playing: false
        });
        this.$player.current.seekTo(gotoAfterStopSec, 'seconds');
    }

    handleProgress({ playedSeconds }) {
        if (this.state.endSec > 0 && playedSeconds > this.state.endSec) {
            this.stopAndReturn();
        }
        this.setState({progress: playedSeconds});
        this.props.onProgressUpdate(playedSeconds);
    };

    handleOnPlay() {
        this.setState({playing: true});
    }

    handleOnReady() {
        console.log('ready!');
    }

    handleStop() {
        this.setState({playing: false});
    }

    playFragment(startSec, endSec, mode) {
        this.$player.current.seekTo(startSec, 'seconds');
        this.setState({
            gotoAfterStopSec: Math.max(mode === 'STAY_AT_END' ? endSec : startSec, 0),
            endSec: Math.max(endSec, 0.01),
            playing: true
        });
    }

    seekTo(pos) {
        this.$player.current.seekTo(pos, 'seconds');
    }

    seekToAndStop(pos) {
        this.setState({
            playing: false
        });
        this.$player.current.seekTo(pos, 'seconds');
    }

    maybeStop1SecPlaying(callback) {
        if (this.state.playing && this.state.gotoAfterStopSec > 0) {
            this.stopAndReturn();
            // We need timeout to give player time to stop and update progress
            setTimeout(callback.bind(this), 100);
        } else {
            callback();
        }
    }

    onMoveToClick(shift) {
        this.maybeStop1SecPlaying(() => {
            this.$player.current.seekTo(Math.max(this.state.progress + shift, 0), 'seconds');
        });
    };


    handlePlayOneSecBefore() {
        this.maybeStop1SecPlaying(() => {
            this.playFragment(this.state.progress - 1, this.state.progress, 'STAY_AT_END');
        });
    }

    handlePlayOneSecAfter() {
        this.maybeStop1SecPlaying(() => {
            this.playFragment(this.state.progress, this.state.progress + 1, 'STAY_AT_START');
        });
    }

    render() {
            const moveTo = [-5, -1, -0.5, -0.1, 0.1, 0.5, 1, 5];

            return (
                <div className='PlayWithNavButtons'>
                    <ReactPlayer
                        ref={this.$player}
                        url={this.props.videoUrl}
                        width='100%'
                        height='100%'
                        onDuration={this.handleDuration.bind(this)}
                        onProgress={this.handleProgress.bind(this)}
                        onPlay={this.handleOnPlay.bind(this)}
                        onReady={this.handleOnReady.bind(this)}
                        progressInterval={100}
                        onPause={this.handleStop.bind(this)}
                        onEnded={this.handleStop.bind(this)}
                        playing={this.state.playing}
                        controls={true}
                    />
                    <div>
                        Current position: <span>{secsToString(this.state.progress)}</span>
                        <div className="move_buttons_parent">
                            {
                                moveTo.map(item => <div className="move_button" onClick={(() => this.onMoveToClick(item)).bind(this)}>{item > 0 ? '+' + item : item}</div>)
                            }
                            <div className="move_button" onClick={this.handlePlayOneSecBefore.bind(this)} >Play 1 sec before</div>
                            <div className="move_button" onClick={this.handlePlayOneSecAfter.bind(this)} >Play 1 sec after</div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default PlayerWithNavButtons;