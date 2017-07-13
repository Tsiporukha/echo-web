import React from 'react';
import {Link} from 'react-router-dom';

import moment from 'moment';

import styles from '../../assets/styles/streamDescription.css';

const StreamDescription = props => (
  <div className={styles.root}>
    <div className={styles.header}>
      <span><b>Updated</b> {moment(props.stream.updated_at).fromNow()} by </span>
      <Link to={`/profile/${props.user.id}`}>
        <img src={props.user.avatar_url} alt='user avatar' className={styles.avatar} />
        <span>{props.user.name}</span>
      </Link>
    </div>

    <div className={styles.body}>
      <div className={styles.artwork}>
        <img src={props.stream.artwork_url} alt='artwork' className={styles.artworkImg} />

        <span className={styles.playPause}>
          {props.isPlaying ?
            <i onClick={props.pause} className={styles.playIcon}>pause</i>
            :
            <i onClick={props.inQueue ? props.play : props.addToQueueTopAndPlay(props.stream, props.playlist, props.songs)}
              className={styles.playIcon}>play_arrow</i>
          }
        </span>
      </div>

      <div className={styles.info}>
        <Link to={`/feed/${props.stream.id}`}>
          <div className={styles.title}>{props.playlist.title || 'no title'}</div>
        </Link>

        <div className={styles.time}>
          <span className={styles.length}>
            <i className={styles.lengthIcon}>queue_music</i> {props.playlist.songs.length}
          </span>
          <span className={styles.duration}>
            <i className={styles.durationIcon}>access_time</i> {props.duration}
          </span>
        </div>

        {props.playlist.description && <div className={styles.description}>
          <b>Room description:</b> <br />
          <i>
            <span>"{props.playlist.description}"</span>
          </i>
        </div>}
      </div>
    </div>

    <div className={styles.tags}>
      {!!props.stream.all_tags.length &&
        <span><span className={styles.t}>Tags:</span>{props.stream.all_tags.map(tag => (<span key={tag} className={styles.tag}>#{tag}</span>))}</span>}
    </div>

    <div className={styles.footer}>
      <div className={styles.leftReg}>
        <div className={styles.flex}>
          <i className={styles.likedIcon}>favorite</i><span>{props.stream.likes_count}</span>
        </div>
      </div>
      <div className={styles.rightReg}>
        <span className={styles.iconDescription} onClick={props.addToQueue(props.stream, props.playlist, props.songs)}>
          <i className={styles.playlistAddIcon}>playlist_add</i><span>Add to Queue</span>
        </span>
        <span className={styles.iconDescription}>
          <i className={styles.likeIcon}>favorite</i><span>Like</span>
        </span>
        <span className={styles.iconDescription}>
          <i className={styles.shareIcon}>share</i><span>Share</span>
        </span>
      </div>
    </div>
  </div>
)

export default StreamDescription;
