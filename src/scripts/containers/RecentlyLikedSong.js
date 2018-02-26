import React, {Component} from 'react';

import {getSongProps} from './Song';

import {getPlayAction} from '../lib/song';
import {duration} from '../lib/duration';

import styles from '../../assets/styles/song.css';


const RecentlyLikedSong = props => (
  <div className={styles.recentlyLiked}>
    <div className={styles.artwork}>
      <img src={props.song.artwork_url} alt='artwork' />
      <span className={styles.playPause}>
        {props.isPlaying ?
          <i className={styles.pauseIcon} onClick={props.pause}>pause</i> :
          <i onClick={getPlayAction(props.isCurrentSong, props.play, props.setCurrentSong(props.song))}
            className={styles.playIcon}>play_arrow</i>}
      </span>
    </div>
    <div className={styles.info}>
      <div className={styles.title}>{props.song.title}</div>
      <div className={styles.artist}>{props.song.artist}</div>
      <div className={styles.duration}>{duration(props.song.duration)}</div>
    </div>
    <div className={styles.icons}>
      <i className={styles.addIcon} onClick={props.addToQueue(props.song)}>playlist_add</i>
    </div>
  </div>
);


export default getSongProps(RecentlyLikedSong);
