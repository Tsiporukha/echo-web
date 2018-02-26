import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';

import Slider from 'react-toolbox/lib/slider';
import Queue from './Queue';

import {getPlaylist} from '../actions/EntitiesAUDActions';
import {play, pause, getNextSong, getPrevSong, setCurrentSong} from '../actions/PlayerActions';
import {addClonedSongsToTop} from '../actions/QueueActions';
import {duration} from '../lib/duration';
import {maybeGetDefaultArtwork} from '../lib/stream';
import {addPlaylistId} from '../lib/song';

import styles from '../../assets/styles/player.css';


const mapStateToProps = state => ({
  currentSong: state.player.currentSong,
  playing: state.player.playing,
  nextSong: state.queue.items.length ? getNextSong(state) : false,
  prevSong: state.queue.items.length ? getPrevSong(state) : false,

  origPlaylist: getPlaylist(state.playlists, state.player.currentSong.playlist),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  setCurrentSong: song => dispatch(setCurrentSong(song)),
  addClonedSongToTop: song => dispatch(addClonedSongsToTop([song])),
});

const initialSongState = {
  duration: 0,
  played: 0,
  loaded: 0,
  playedSeconds: 0,
};


class Player extends Component {
  addSongToQueueTopAndPlay = song => {
    this.props.origPlaylist && this.props.addClonedSongToTop(song);
    return this.props.setCurrentSong(addPlaylistId(song, this.props.origPlaylist));
  };

  playNext = () => this.addSongToQueueTopAndPlay(this.props.nextSong);
  playPrev = () => this.addSongToQueueTopAndPlay(this.props.prevSong);


  setVolume = volume => this.setState({volume});
  setProgress = val => this.refs.player.seekTo(parseFloat(val));
  onProgress = played => this.setState({...played});

  toggleIsQueueOpen = () => this.setState({isQueueOpen: !this.state.isQueueOpen});

  maybeTitlePlaceholder = str => str || '--//--';

  reinitializeSongState = (nextProps, props) => nextProps.currentSong.id !== props.currentSong.id ? this.setState({...initialSongState}) : false;
  showPlayer = () => this.setState({playerVisibility: true});

  state = {
    isQueueOpen: true,
    playerVisibility: false,
    volume: 0.8,
    ...initialSongState,
  };

  componentWillReceiveProps = nextProps => this.reinitializeSongState(nextProps, this.props) || this.showPlayer();

  render() {
    return (
      this.state.playerVisibility &&
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

          <i className={this.state.isQueueOpen ? styles.currentQueueIconActive : styles.currentQueueIcon}
            onClick={this.toggleIsQueueOpen}>queue_music</i>

          <div style={{display: this.state.isQueueOpen ? 'block' : 'none', margin: 0}}><Queue /></div>

          <ReactPlayer
            ref='player'
            className={styles.reactPlayer}
            width={240}
            height={135}
            url={this.props.currentSong.export_data_url}
            playing={this.props.playing}
            volume={this.state.volume}
            onProgress={this.onProgress}
            onEnded={this.playNext}
            onDuration={drtn => this.setState({duration: drtn})}
          />
        </div>


      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
