import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

import fromNow from 'moment-from-now';

import LoginDialog from './LoginDialog';
import StreamEditing from './StreamEditing';
import ShareIconMenu from './ShareIconMenu';
import AddToQueueButton from '../containers/AddToQueueButton';


import {likeStream, unlikeStream} from '../actions/SubFeedsActions';
import {maybeGetDefaultArtwork} from '../lib/stream';

import styles from '../../assets/styles/streamCard.css';


const TooltipButton = Tooltip(Button);


const getLikeButtonOnClick = (token, dispatchLikeAction, stream, showLogin) => token ?
  dispatchLikeAction(stream.your_likes ? unlikeStream : likeStream)(stream, token) : showLogin;
const getLikeButtonTitle = liked => liked ? 'Liked' : 'Like';


class StreamCard extends Component {
  static propTypes = {
    user: PropTypes.object,
    stream: PropTypes.object,
    playlist: PropTypes.object,
    currentUserId: PropTypes.number,
    songs: PropTypes.array,
    token: PropTypes.string,
    duration: PropTypes.string,

    isPlaying: PropTypes.bool,
    inQueue: PropTypes.bool,

    update: PropTypes.func,
    play: PropTypes.func,
    pause: PropTypes.func,
    dispatchLikeAction: PropTypes.func,
    addToQueueTopAndPlay: PropTypes.func,
    searchTag: PropTypes.func,
  };


  toggleLoginVisibility = () => this.setState({loginVisibility: !this.state.loginVisibility});
  toggleStreamEditing = () => this.setState({streamEditing: !this.state.streamEditing});


  state = {
    loginVisibility: false,
    streamEditing: false,
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <span><b>Updated</b> {fromNow(new Date(this.props.stream.updated_at))} by </span>
          <Link to={`/profile/${this.props.user.id}`}>
            <img src={this.props.user.avatar_url} alt='user avatar' className={styles.avatar} />
            <span>{this.props.user.name}</span>
          </Link>
          {this.props.stream.allowed_users_ids.includes(this.props.currentUserId) &&
            <div className={styles.editArea}>
              <span onClick={this.toggleStreamEditing}>edit</span>
              {this.state.streamEditing && <StreamEditing onCancel={this.toggleStreamEditing} save={this.props.update(this.props.stream.id)}
                stream={this.props.stream} playlist={this.props.playlist} songs={this.props.songs}
                token={this.props.token} />}
            </div>
          }
        </div>


        <div className={styles.body}>
          <div className={styles.artworkArea}>
            <img src={maybeGetDefaultArtwork(this.props.stream.artwork_url)} alt='artwork' className={styles.artworkImg} />

            {this.props.isPlaying ?
              <i onClick={this.props.pause} className={styles.pauseIcon}>pause</i>
              :
              <i className={styles.playIcon}
                onClick={this.props.inQueue ?
                  this.props.play :
                  this.props.addToQueueTopAndPlay(this.props.stream, this.props.playlist, this.props.songs)
                }>play_arrow</i>
            }
          </div>

          <div className={styles.info}>
            <div className={styles.title}>
              <Link to={`/feed/${this.props.stream.id}`}>
                {this.props.playlist.title || 'no title'}
              </Link>
            </div>

            <div className={styles.time}>
              <span className={styles.length}>
                <i className={styles.lengthIcon}>queue_music</i> {this.props.playlist.songs.length}
              </span>
              <span className={styles.duration}>
                <i className={styles.durationIcon}>access_time</i> {this.props.duration}
              </span>
              <span className={styles.commentsCount}>
                <i className={styles.commentsIcon}>comment</i> {this.props.stream.comments_count}
              </span>
            </div>

            {this.props.playlist.description && <div className={styles.description}>
              <b>Stream description:</b>
              <i>"{this.props.playlist.description}"</i>
            </div>}
          </div>
        </div>


        {!!this.props.stream.all_tags.length && <div className={styles.tags}>
          <span className={styles.t}>Tags:</span>
          {this.props.stream.all_tags.map(tag => (<span onClick={this.props.searchTag(tag)} key={tag} className={styles.tag}>#{tag}</span>))}
        </div>}


        <div className={styles.footer}>
          <div className={styles.left}>
            {!!this.props.stream.likes_count && <div className={styles.likedArea}>
              <i className={styles.likedIcon}>favorite</i><span>{this.props.stream.likes_count}</span>
            </div>}
          </div>

          <div className={styles.right}>
            <AddToQueueButton type='stream' holder={this.props.stream} playlist={this.props.playlist} songs={this.props.songs} />
            <TooltipButton theme={styles} raised tooltip='Save to My Likes' tooltipDelay={500}
              onClick={getLikeButtonOnClick(this.props.token, this.props.dispatchLikeAction, this.props.stream, this.toggleLoginVisibility)}>
              <span className={styles.iconDescription}>
                <i className={styles.likeIcon}>favorite</i><span>{getLikeButtonTitle(this.props.stream.your_likes)}</span>
              </span>
            </TooltipButton>
            <ShareIconMenu path={`/feed/${this.props.stream.id}`} picture={this.props.stream.artwork_url}
              title={this.props.playlist.title} description={this.props.playlist.description} />
          </div>
        </div>


        {!this.props.token && <LoginDialog active={this.state.loginVisibility} onEscKeyDown={this.toggleLoginVisibility} />}
      </div>
    );
  }
}


export default StreamCard;
