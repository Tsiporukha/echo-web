import React, {Component} from 'react';

import {duration} from '../lib/duration';

import styles from '../../assets/styles/song.css';

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
      {props.addToCurrentQueue && <i
        onClick={() => props.addToCurrentQueue([props.song])}>add</i> }
      {props.remove && <i
        onClick={() => props.remove([props.song])}>close</i>}
    </div>
  </div>
)

export default Song;
