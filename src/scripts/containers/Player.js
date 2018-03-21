import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';

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
  nextSong: state.queue.items.length && getNextSong(state),
  prevSong: state.queue.items.length && getPrevSong(state),

  origPlaylist: getPlaylist(state.playlists, state.player.currentSong.playlist),
});

const mapDispatchToProps = dispatch => ({
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
  static propTypes = {
    currentSong: PropTypes.object,
    playing: PropTypes.bool,

    play: PropTypes.func,
    pause: PropTypes.func,
    setCurrentSong: PropTypes.func,
    addClonedSongToTop: PropTypes.func,
  }


  toggleAttr = name => () => this.setState({[name]: !this.state[name]});


  addSongToQueueTopAndPlay = song => {
    this.props.origPlaylist && this.props.addClonedSongToTop(song);
    return this.props.setCurrentSong(addPlaylistId(song, this.props.origPlaylist));
  };

  playNext = () => this.addSongToQueueTopAndPlay(this.props.nextSong);
  playPrev = () => this.addSongToQueueTopAndPlay(this.props.prevSong);

  maybeSetPlayback = (shouldPlaying, fn) => () => this.props.playing === shouldPlaying || fn();

  setVolume = volume => this.setState({volume});
  setProgress = played => this.setState(
    {played, playedSeconds: this.state.duration * played},
    this.refs.player.seekTo(parseFloat(played))
  );

  onProgress = played => this.setState({...played});

  reinitializeSongState = (nextProps, props) =>
    nextProps.currentSong.id === props.currentSong.id || this.setState({...initialSongState});

  showPlayer = () => this.setState({playerVisibility: true});

  maybeTitlePlaceholder = str => str || '--//--';

  getAreaPosition = priority => {
    const getNum = pr => {
      switch (pr) {
        case 1: return +this.state.playerMenu;
        case 2: return this.state.reactPlayer ? this.state.playerMenu + this.state.reactPlayer : 0;
        case 3: return +this.state.isQueueOpen && this.state.playerMenu + this.state.reactPlayer + this.state.isQueueOpen;
        default: 0;
      }
      return 0;
    };

    return styles[`p${getNum(priority)}`];
  };


  state = {
    playerVisibility: false,

    isQueueOpen: true,
    reactPlayer: true,
    playerMenu: true,

    volume: 0,
    ...initialSongState,
  };

  componentWillReceiveProps = nextProps => this.reinitializeSongState(nextProps, this.props) || this.showPlayer();

  render() {
    return (
      this.state.playerVisibility &&
      <div className={styles.root}>

        <div className={`${styles.playerArea} ${this.getAreaPosition(1)}`}>
          <div className={styles.infoArea}>
            <div className={styles.artwork}>
              <img src={maybeGetDefaultArtwork(this.props.currentSong.artwork_url)} alt='artwork' />
            </div>

            <div className={styles.info}>
              <div className={styles.title}>{this.maybeTitlePlaceholder(this.props.currentSong.title)}</div>
              <div className={styles.artist}>by {this.maybeTitlePlaceholder(this.props.currentSong.artist)}</div>
            </div>
          </div>

          <div className={styles.playbackArea}>
            <i className={styles.prevIcon} onClick={this.playPrev}>skip_previous</i>
            {this.props.playing ?
              <i className={styles.pauseIcon} onClick={this.props.pause}>pause</i> :
              <i className={styles.playIcon} onClick={this.props.play}>play_arrow</i>
            }
            <i className={styles.nextIcon} onClick={this.playNext}>skip_next</i>
          </div>

          <div className={styles.volumeArea}>
            <i className={styles.volumeIcon}>volume_down</i>
            <Slider min={0} max={1} theme={styles} value={this.state.volume} onChange={this.setVolume} />
          </div>

          <div className={styles.progressArea} onMouseUp={this.onSeekMouseUp}>
            <span>{duration(this.state.playedSeconds)}</span>
            <Slider theme={styles} min={0} max={1} value={this.state.played} onChange={this.setProgress} />
            <span>{duration(this.state.duration - this.state.playedSeconds)}</span>
          </div>
        </div>


        <ReactPlayer
          ref='player'
          className={`${styles.reactPlayer} ${this.getAreaPosition(2)}`}
          url={this.props.currentSong.export_data_url}
          playing={this.props.playing}
          volume={this.state.volume}
          onPlay={this.maybeSetPlayback(true, this.props.play)}
          onPause={this.maybeSetPlayback(false, this.props.pause)}
          onProgress={this.onProgress}
          onEnded={this.playNext}
          onDuration={drtn => this.setState({duration: drtn})}
        />


        <div className={`${styles.queueContainer} ${this.getAreaPosition(3)}`}>
          <Queue />
        </div>


        <div className={styles.menuIconArea}>
          <i className={this.state.playerMenu ? styles.playerMenuIconActive : styles.playerMenuIcon}
            onClick={this.toggleAttr('playerMenu')}>format_align_center</i>
          <i className={this.state.reactPlayer ? styles.rpIconActive : styles.rpIcon}
            onClick={this.toggleAttr('reactPlayer')}>aspect_ratio</i>
          <i className={this.state.isQueueOpen ? styles.currentQueueIconActive : styles.currentQueueIcon}
            onClick={this.toggleAttr('isQueueOpen')}>queue_music</i>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
