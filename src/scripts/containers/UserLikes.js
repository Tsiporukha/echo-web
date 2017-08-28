import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Tab, Tabs} from 'react-toolbox';

import Song from './Song';
import Stream from './Stream';

import {addSongs, addUsers, addNormalizedStreamsData} from '../actions/EntitiesAUDActions';

import {reduceToObject, reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';
import {getUser} from '../lib/ebApi/users';
import {getLikedSongs, getLikedStreams} from '../lib/ebApi/users';


import favSubTabsTheme from '../../assets/styles/feed.css';

const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUser: user => dispatch(addUsers({[user.id]: user})),
  addNormalizedStreamsData: normalizedData => dispatch(addNormalizedStreamsData(normalizedData)),

  fetchAndReceiveSongs: (limit, offset, token) => getLikedSongs(ownProps.userId, limit, offset, token)
    .then(({songs}) => Promise.resolve(dispatch(addSongs(reduceToObject(songs)))).then(_ => songs.map(song => song.id))),
});

class PopularSongs extends Component {

  handleTabChange = tab => this.setState({tab});

  fetchAndReceiveStreams = (limit, offset, token) => getLikedStreams(this.props.userId, limit, offset, token)
    .then(({streams}) => Promise.resolve(this.props.addNormalizedStreamsData(reduceStreamsToNormalized(streams)))
      .then(_ => this.setState({streams: streams.map(s => s.id)}) )
      .then(_ => getUser(this.props.userId, token).then(user => this.props.addUser(user)))
      .then(_ => streams.map(stream => stream.id))
    );

  fetchAndReceiveSongsIds = (token = this.props.token) =>
    this.props.fetchAndReceiveSongs(this.state.limit, this.state.offset, token).then(songs => this.setState({songs}));

  fetchAndReceiveStreamsIds = (token = this.props.token) =>
    this.fetchAndReceiveStreams(this.state.limit, this.state.offset, token).then(streams => this.setState({streams}));

  fetchAndReceiveLikes = (token = this.props.token) => Promise.all([this.fetchAndReceiveStreamsIds(token), this.fetchAndReceiveSongsIds(token)]);

  maybeReloadOnPropsChange = (nextProps, props = this.props) =>
    ((nextProps.token !== props.token) || (props.userId !== nextProps.userId)) ?
      this.fetchAndReceiveLikes(nextProps.token) : false;


  componentWillMount = () => this.fetchAndReceiveLikes();

  componentWillReceiveProps = nextProps => this.maybeReloadOnPropsChange(nextProps, this.props)

  state = {
    tab: 0,

    songs: [],
    streams: [],

    limit: 14,
    offset: 0,
  };

  render() {
    return(
      <Tabs theme={favSubTabsTheme} index={this.state.tab} onChange={this.handleTabChange}>
        <Tab label='Rooms'>
          {this.state.streams.map(streamId => <Stream id={streamId} key={streamId} />)}
        </Tab>
        <Tab label='Songs'>
          {this.state.songs.map(songId => <Song id={songId} key={songId} />)}
        </Tab>
      </Tabs>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularSongs);
