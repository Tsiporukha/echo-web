import React, {Component} from 'react';
import {connect} from 'react-redux';

import {cloneSongsAndAdd, cloneSongsAndAddToTop} from '../actions/QueueActions';

import {duration} from '../lib/duration';

import styles from '../../assets/styles/song.css';

const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.id],
  inQueue: state.queue.items.includes(ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToQueue: song => () =>  dispatch(cloneSongsAndAdd([song])),
  addToQueueTop: song => () => dispatch(cloneSongsAndAddToTop([song])),
  removeFromQueue: () => dispatch(removeFromQueue(ownProps.id))
});

const Song = props => (
  <div className={styles.root}>
    <div className={styles.artwork}>
      <img src={props.song.artwork_url} />
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{props.song.title}</div>
      <div className={styles.artist}>{props.song.artist}</div>
      <div className={styles.duration}>{duration(props.song.duration)}</div>
    </div>
    <div className={styles.icons}>
      {props.inQueue ?
        <i onClick={props.removeFromQueue}>close</i>
        :
        <i className={styles.addIcon} onClick={props.addToQueue(props.song)}>add</i>
      }
    </div>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Song);
