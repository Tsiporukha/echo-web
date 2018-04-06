import React, {Component} from 'react';
import {connect} from 'react-redux';

import RecentlyLikedSong from './RecentlyLikedSong';
import RecentlyLikedStream from './RecentlyLikedStream';
import WelcomeNote from '../components/WelcomeNote';

import {fetchAndReceiveLikedStreamsIds, fetchAndReceiveLikedSongsIds} from '../actions/EntitiesAUDActions';

import styles from '../../assets/styles/feed.css';


const RecentlyLikedItems = ({songs, streams}) => (
  <div className={styles.recentlyLiked}>
    {!!streams.length && <div className={styles.streams}>
      <div className={styles.itemsTitle}>RECENTLY LIKED PLAYLISTS</div>
      {streams.map(streamId => <RecentlyLikedStream id={streamId} key={streamId} />)}
    </div>}
    {!!songs.length && <div className={styles.songs}>
      <div className={styles.itemsTitle}>RECENTLY LIKED SONGS</div>
      {songs.map(songId => <RecentlyLikedSong id={songId} key={songId} />)}
    </div>}
  </div>
);


const mapStateToProps = state => ({
  token: state.session.token,
  userId: state.session.user && state.session.user.id,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveStreamsIds: (userId, limit, offset, token) => dispatch(fetchAndReceiveLikedStreamsIds(userId, limit, offset, token)),
  fetchAndReceiveSongsIds: (userId, limit, offset, token) => dispatch(fetchAndReceiveLikedSongsIds(userId, limit, offset, token)),
});


const emptyItems = {
  songs: [],
  streams: [],
};

class RecentlyLiked extends Component {
  clearLikes = () => this.setState(emptyItems);

  fetchAndReceiveStreamsIds = (userId = this.props.userId, token = this.props.token) =>
    this.props.fetchAndReceiveStreamsIds(userId, this.state.limit, this.state.offset, token).then(streams => this.setState({streams}));

  fetchAndReceiveSongsIds = (userId = this.props.userId, token = this.props.token) =>
    this.props.fetchAndReceiveSongsIds(userId, this.state.limit, this.state.offset, token).then(songs => this.setState({songs}));

  fetchAndReceiveItems = (userId = this.props.userId, token = this.props.token) =>
    Promise.all([this.fetchAndReceiveStreamsIds(userId, token), this.fetchAndReceiveSongsIds(userId, token)]);


  state = {
    ...emptyItems,

    limit: 4,
    offset: 0,
  };

  componentDidMount = () => this.props.token && this.props.userId && this.fetchAndReceiveItems();

  componentWillReceiveProps = nextProps => nextProps.token ? this.fetchAndReceiveItems(nextProps.userId, nextProps.token) : this.clearLikes();

  render() {
    return (
      this.state.songs.length || this.state.streams.length ?
        <RecentlyLikedItems songs={this.state.songs} streams={this.state.streams} /> :
        <WelcomeNote />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyLiked);
