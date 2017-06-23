import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addClonedSongs, addClonedSongToTopAndPlay, remove as removeFromQueue} from '../actions/QueueActions';
import {setCurrentSong, pause, play} from '../actions/PlayerActions';

import {duration} from '../lib/duration';

import styles from '../../assets/styles/song.css';

const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.id],
  isCurrentSong: state.player.currentSong.id === ownProps.id,
  isPlaying: state.player.playing && (state.player.currentSong.id === ownProps.id),
  inQueue: state.queue.items.some(item => item.id === ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToQueue: song => () =>  dispatch(addClonedSongs([song])),
  addToQueueAndPlay: song => () => dispatch(addClonedSongToTopAndPlay(song)),
  removeFromQueue: () => dispatch(removeFromQueue(ownProps.id)),
  setCurrentSong: song => () => dispatch(setCurrentSong(song)),

  play: () => dispatch(play()),
  pause: () => dispatch(pause())
});

const getPlayAction = (song, inQueue, isCurrentSong, play, setCurrentSong, addToQueueAndPlay) => inQueue ?
  isCurrentSong ? play : setCurrentSong(song)
  :
  addToQueueAndPlay(song);

const Song = props => (
  <div className={styles.root}>
    <div className={styles.artwork}>
      <img src={props.song.artwork_url} />
      <span className={styles.playPause}>
        {props.isPlaying ?
          <i className={styles.pauseIcon} onClick={props.pause}>pause</i> :
          <i onClick={getPlayAction(props.song, props.inQueue, props.isCurrentSong, props.play, props.setCurrentSong, props.addToQueueAndPlay)}
            className={styles.playIcon}>play_arrow</i>}
      </span>
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{props.song.title}</div>
      <div className={styles.artist}>{props.song.artist}</div>
      <div className={styles.duration}>{duration(props.song.duration)}</div>
    </div>
    <div className={styles.icons}>
      {props.inQueue ?
        <i className={styles.removeIcon} onClick={props.removeFromQueue}>close</i>
        :
        <i className={styles.addIcon} onClick={props.addToQueue(props.song)}>add</i>
      }
    </div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Song);
