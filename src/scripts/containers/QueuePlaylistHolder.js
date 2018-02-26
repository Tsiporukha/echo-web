import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import QueuePlaylistHolderSong from './QueuePlaylistHolderSong';

import {remove} from '../actions/QueueActions';
import {playlistDuration, withHours as durationWithHours} from '../lib/duration';
import {getWithNestedEntities as getRoomWithNestedEntities} from '../lib/room';
import {getWithNestedEntities as getStreamWithNestedEntities, maybeGetDefaultArtwork} from '../lib/stream';

import styles from '../../assets/styles/queueStream.css';

const getWithNestedEntities = {
  stream: getStreamWithNestedEntities,
  room: getRoomWithNestedEntities,
};

const mapStateToProps = (state, ownProps) => {
  const {[ownProps.type]: holder, playlist, songs, user, duration} = getWithNestedEntities[ownProps.type](state, ownProps.id);
  return {holder, playlist, songs, user, duration};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(remove(ownProps.id)),
});

class QueuePlaylistHolder extends Component {
  toggleSongList = () => this.setState({opened: !this.state.opened});

  openStreamInNewTab = () => Promise.resolve(window.open(`http://beta.echoapplication.com/#/feed/${this.props.holder.id}`)).then(win => win.focus());


  state = {opened: false}

  componentWillReceiveProps = nextProps => nextProps.playlist.songs.length ? false : this.props.remove();

  render() {
    return (
      <div className={`${styles.root} ${this.state.opened ? styles.opened : ''}`}>
        <div style={{cursor: 'pointer'}} onClick={this.toggleSongList}>
          <div className={styles.artwork}>
            <img src={maybeGetDefaultArtwork(this.props.holder.artwork_url)} alt='artwork' />
          </div>
          <div className={styles.info}>
            <div className={styles.title}>
              <span>{this.props.playlist.title || 'no title'}</span>
              <i className={styles.openInNewIcon} onClick={this.openStreamInNewTab}>open_in_new</i>
            </div>
            {!!this.props.user && <div className={styles.userAvatar}>
              by <img src={this.props.user.avatar_url} alt='user avatar' />
              <span className={styles.username}>{this.props.user.name}</span>
            </div>}
            <div className={styles.duration}>
              <i className={styles.timeIcon}>access_time</i>
              <span>{this.props.duration}</span>
              <i className={styles.queueIcon}>queue_music</i>
              <span>{this.props.playlist.songs.length} tracks</span>
              <i className={styles[this.state.opened ? 'openedIcon' : 'closedIcon']}>arrow_drop_down</i>
            </div>
          </div>
          <div className={styles.icons}>
            <i className={styles.closeIcon} onClick={this.props.remove}>close</i>
          </div>
        </div>
        <div className={`${styles.songList} ${this.state.opened ? styles.visible : ''}`}>
          {this.props.playlist.songs.map(songId => <QueuePlaylistHolderSong playlist={this.props.playlist} id={songId} key={songId} />)}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePlaylistHolder);
