import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {IconMenu, MenuItem, MenuDivider, Button, Tooltip} from 'react-toolbox';
import CopyToClipboard from 'react-copy-to-clipboard';

import LoginDialog from './LoginDialog';

import moment from 'moment';

import {likeStream, unlikeStream} from '../actions/SubFeedsActions';
import {maybeGetDefaultArtwork} from '../lib/stream';

import styles from '../../assets/styles/streamDescription.css';


const TooltipButton = Tooltip(Button);
const TooltipIconMenu = Tooltip(IconMenu);

const ShareButton = () => (
  <span className={styles.iconDescription}>
    <i className={styles.shareIcon}>share</i><span>Share</span>
  </span>
)


const CopyToClipboardMenuItem = streamId => (
  <CopyToClipboard text={`${document.domain}/feed/${streamId}`}
    onCopy={() => this.setState({copied: true})}>
    <i className='material-icons'>link</i>
  </CopyToClipboard>
)


const shareOnFacebook = stream => () => FB.ui({
  method: 'share',
  href: `${document.domain}/feed/${stream.id}`,     // The same than link in feed method
  title: stream.title,  // The same than name in feed method
  picture: stream.artwork_url,
  caption: document.domain,
  description: stream.description,
}, response => false);


const getLikeButtonOnClick = (token, dispatchLikeAction, stream, showLogin) => token ?
  dispatchLikeAction(stream.your_likes ? unlikeStream : likeStream)(stream, token) : showLogin;
const getLikeButtonTitle = liked => liked ? 'Liked' : 'Like';


const StreamDescriptionRender = (props, loginVisibility, toggleLoginVisibility) => (
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
        <img src={maybeGetDefaultArtwork(props.stream.artwork_url)} alt='artwork' className={styles.artworkImg} />

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
          <span className={styles.commentsCount}>
            <i className={styles.commentsIcon}>comment</i> {props.stream.comments_count}
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

    {!!props.stream.all_tags.length && <div className={styles.tags}>
      <span>
        <span className={styles.t}>Tags:</span>
        {props.stream.all_tags.map(tag => (<span onClick={props.searchTag(tag)} key={tag} className={styles.tag}>#{tag}</span>))}
      </span>
    </div>}

    <div className={styles.footer}>
      <div className={styles.leftReg}>
        {!!props.stream.likes_count && <div className={styles.flex}>
          <i className={styles.likedIcon}>favorite</i><span>{props.stream.likes_count}</span>
        </div>}
      </div>
      <div className={styles.rightReg}>
        <TooltipButton theme={styles} raised tooltip='Add to Queue' tooltipDelay={500} onClick={props.addToQueue(props.stream, props.playlist, props.songs)}>
          <span className={styles.iconDescription}>
            <i className={styles.playlistAddIcon}>playlist_add</i><span>Add to Queue</span>
          </span>
        </TooltipButton>
        <TooltipButton theme={styles} raised tooltip='Save to My Likes' tooltipDelay={500}
          onClick={getLikeButtonOnClick(props.token, props.dispatchLikeAction, props.stream, toggleLoginVisibility)}>
          <span className={styles.iconDescription}>
            <i className={styles.likeIcon}>favorite</i><span>{getLikeButtonTitle(props.stream.your_likes)}</span>
          </span>
        </TooltipButton>
        <TooltipIconMenu icon={<ShareButton />} menuRipple theme={styles} tooltip='Share' tooltipDelay={500} >
          <MenuItem caption='Share via:' disabled theme={styles} />
          <CopyToClipboard text={`${document.domain}/feed/${props.stream.id}`}>
            <MenuItem icon='link' caption='Link' theme={styles} />
          </CopyToClipboard>


          <MenuItem onClick={shareOnFacebook(props.stream)} icon={<i className={styles.facebookIcon} />} caption='Facebook' theme={styles} />
        </TooltipIconMenu>
      </div>
    </div>

    {!props.token && <LoginDialog active={loginVisibility} onEscKeyDown={toggleLoginVisibility} />}
  </div>
)


class StreamDescription extends Component {

  toggleLoginVisibility = () => this.setState({loginVisibility: !this.state.loginVisibility});


  state = {
    loginVisibility: false,
  }

  render(){
    return StreamDescriptionRender(this.props, this.state.loginVisibility, this.toggleLoginVisibility)
  }
}


export default StreamDescription;
