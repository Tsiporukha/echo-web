import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {getStreamProps} from './Stream';

import {duration} from '../lib/duration';

import styles from '../../assets/styles/song.css';


const getPlayAction = (isCurrentSong, playCurrentSong, setCurrentSong, song) => isCurrentSong ? playCurrentSong : setCurrentSong;

const RecentlyLikedStream = props => (
  <div className={styles.recentlyLiked}>
    <div className={styles.streamArtwork}>
      <img src={props.stream.artwork_url} />
      <span className={styles.playPause}>
        {props.isPlaying ?
          <i className={styles.pauseIcon} onClick={props.pause}>pause</i> :
          <i onClick={props.inQueue ? props.play : props.addToQueueTopAndPlay(props.stream, props.playlist, props.songs)}
            className={styles.playIcon}>play_arrow</i>}
      </span>
    </div>
    <div className={styles.info}>
      <Link to={`/feed/${props.stream.id}`}>
        <div className={styles.streamTitle}>{props.playlist.title}</div>
      </Link>

      <div className={styles.time}>
        <span className={styles.length}>
          <i className={styles.lengthIcon}>queue_music</i>
          <span>{props.playlist.songs.length}</span>
        </span>
        <span className={styles.duration}>
          <i className={styles.durationIcon}>access_time</i>
          <span>{props.duration}</span>
        </span>
      </div>

      <div className={styles.tags}>
        {props.stream.all_tags.map(tag => (<span onClick={props.searchTag(tag)} key={tag} className={styles.tag}>#{tag}</span>))}
      </div>
    </div>
    <div className={styles.icons}>
      <i className={styles.addIcon} onClick={props.addToQueue(props.stream, props.playlist, props.songs)}>playlist_add</i>
    </div>
  </div>
);


export default getStreamProps(RecentlyLikedStream);
