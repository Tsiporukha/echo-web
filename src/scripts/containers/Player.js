import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';

import Slider from 'react-toolbox/lib/slider';
import CurrentQueue from './Queue';

import {play, pause, getNextSong, getPrevSong, setCurrentSong, getQueueSongs} from '../actions/PlayerActions';
import {duration} from '../lib/duration';
import {maybeGetDefaultArtwork} from '../lib/stream';

import styles from '../../assets/styles/player.css';


const mapStateToProps = state => ({
  currentSong: state.player.currentSong,
  id: state.player.currentSong.id,
  playing: state.player.playing,
  nextSong: state.queue.items.length ? getNextSong(state) : false,
  prevSong: state.queue.items.length ? getPrevSong(state) : false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  setCurrentSong: song => dispatch(setCurrentSong(song))
});

const initialSongState = {
  duration: 0,
  played: 0,
  loaded: 0,
  playedSeconds: 0
};


class Player extends Component {

  playNext = () => this.props.setCurrentSong(this.props.nextSong);
  playPrev = () => this.props.setCurrentSong(this.props.prevSong);

  setVolume = volume => this.setState({volume});
  setProgress = val => {
    this.setState({seeking: false});
    return this.player.seekTo(parseFloat(val))
  };
  onProgress = played => this.setState({...played});

  toggleQueueVisibility = () => this.setState({queueVisibility: !this.state.queueVisibility});

  maybeTitlePlaceholder = str => str || '--//--';


  state = {
    queueVisibility: true,
    volume: 0.8,
    ...initialSongState
  };

  componentWillReceiveProps = nextProps => nextProps.currentSong.id !== this.props.id ? this.setState({...initialSongState}) : false;

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.bottomPlayer}>
          <div className={styles.artwork}>
            <img src={maybeGetDefaultArtwork(this.props.currentSong.artwork_url)} className={styles.artwork} alt='artwork' />
          </div>

          <div className={styles.songInfo}>
            <h5>{this.maybeTitlePlaceholder(this.props.currentSong.title)}</h5>
            <h6>by {this.maybeTitlePlaceholder(this.props.currentSong.artist)}</h6>
          </div>

          <i className={styles.prevIcon} onClick={this.playPrev}>skip_previous</i>
          {this.props.playing ?
            <i className={styles.pauseIcon} onClick={this.props.pause}>pause</i> :
            <i className={styles.playIcon} onClick={this.props.play}>play_arrow</i>
          }
          <i className={styles.nextIcon} onClick={this.playNext}>skip_next</i>

          <i className={styles.volumeIcon}>volume_down</i>
          <div className={styles.playerVolume}>
            <Slider min={0} max={1} theme={styles} value={this.state.volume} onChange={this.setVolume} />
          </div>

          <span>{duration(this.state.playedSeconds)}</span>
          <div className={styles.songProgress} onMouseUp={this.onSeekMouseUp}>
            <Slider theme={styles} min={0} max={1} value={this.state.played} onChange={this.setProgress} />
          </div>
          <span>{duration(this.state.duration - this.state.playedSeconds)}</span>

          <i className={this.state.queueVisibility ? styles.currentQueueIconActive : styles.currentQueueIcon}
            onClick={this.toggleQueueVisibility}>queue_music</i>

          {this.state.queueVisibility && <CurrentQueue />}

          <ReactPlayer
            ref={player => this.player = player}
            className={styles.reactPlayer}
            width={240}
            height={135}
            url={this.props.currentSong.export_data_url}
            playing={this.props.playing}
            volume={this.state.volume}
            onProgress={this.onProgress}
            onEnded={this.playNext}
            onDuration={duration => this.setState({duration})}
          />
        </div>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
