import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LoginDialog from './LoginDialog';

import {duration} from '../lib/duration';

import styles from '../../assets/styles/song.css';

const getPlayAction = (isCurrentSong, playCurrentSong, setCurrentSong, song) => isCurrentSong ? playCurrentSong : setCurrentSong;
const getLikeAction = (song, token, toggleLike, showLogin) => () => token ? toggleLike(song, token) : showLogin();

const SongRender = (props, loginVisibility, toggleLoginVisibility) => (
  <div className={styles.root}>
    {props.song.user_id && !props.inQueue && <span className={styles.likeArea}>
      <span>{props.song.likers_count}</span>
      <i onClick={getLikeAction(props.song, props.token, props.toggleLike, toggleLoginVisibility)}
        className={props.song.liked ? styles.likedIcon : styles.likeIcon}>favorite</i>
    </span>}
    <div className={styles.artwork}>
      <img src={props.song.artwork_url} />
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
      {props.inQueue ?
        <i className={styles.removeIcon} onClick={props.remove}>close</i>
        :
        <i className={styles.addIcon} onClick={props.addToQueue(props.song)}>add</i>
      }
    </div>


    {!props.token && <LoginDialog active={loginVisibility} onEscKeyDown={toggleLoginVisibility} />}
  </div>
)


export default class Song extends Component {

  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };


  toggleLoginVisibility = () => this.setState({loginVisibility: !this.state.loginVisibility});


  state = {
    loginVisibility: false,
  }

  render(){
    return SongRender(this.props, this.state.loginVisibility, this.toggleLoginVisibility)
  }
}
