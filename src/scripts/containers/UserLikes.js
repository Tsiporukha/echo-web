import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Tab, Tabs} from 'react-toolbox';

import Song from './Song';
import Stream from './Stream';
import IndeterminateProgressLine, {doWithProgressLine} from '../components/IndeterminateProgressLine';


import {fetchAndReceiveLikedStreamsIds, fetchAndReceiveLikedSongsIds, addUsers} from '../actions/EntitiesAUDActions';

import {reduceToObject, reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';
import {getUser} from '../lib/ebApi/users';


import favSubTabsTheme from '../../assets/styles/feed.css';

const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUser: user => dispatch(addUsers({[user.id]: user})),
  fetchAndReceiveStreamsIds: (userId, limit, offset, token) => dispatch(fetchAndReceiveLikedStreamsIds(userId, limit, offset, token)),
  fetchAndReceiveSongsIds: (userId, limit, offset, token) => dispatch(fetchAndReceiveLikedSongsIds(userId, limit, offset, token)),
});

class PopularSongs extends Component {

  handleTabChange = tab => this.setState({tab});


  fetchAndReceiveStreamsIds = (userId = this.props.userId, token = this.props.token) =>
    this.props.fetchAndReceiveStreamsIds(userId, this.state.limit, this.state.offset, token).then(streams => this.setState({streams}));

  fetchAndReceiveSongsIds = (userId = this.props.userId, token = this.props.token) =>
    this.props.fetchAndReceiveSongsIds(userId, this.state.limit, this.state.offset, token).then(songs => this.setState({songs}));


  setFetching = fetching => this.setState({fetching});
  fetchAndReceiveItems = (userId = this.props.userId, token = this.props.token) => doWithProgressLine(
    () => Promise.all([this.fetchAndReceiveStreamsIds(userId, token), this.fetchAndReceiveSongsIds(userId, token)]), this.setFetching
  );

  maybeReloadOnPropsChange = (nextProps, props = this.props) =>
    ((nextProps.token !== props.token) || (props.userId !== nextProps.userId)) ?
      this.fetchAndReceiveItems(nextProps.userId, nextProps.token) : false;


  componentWillMount = () => this.fetchAndReceiveItems();

  componentWillReceiveProps = nextProps => this.maybeReloadOnPropsChange(nextProps, this.props)

  state = {
    tab: 0,

    songs: [],
    streams: [],

    limit: 14,
    offset: 0,

    fetching: false,
  };

  render() {
    return(
      <div>
        <Tabs theme={favSubTabsTheme} index={this.state.tab} onChange={this.handleTabChange}>
          <Tab label='Rooms'>
            {this.state.streams.map(streamId => <Stream id={streamId} key={streamId} />)}
          </Tab>
          <Tab label='Songs'>
            {this.state.songs.map(songId => <Song id={songId} key={songId} />)}
          </Tab>


        </Tabs>

        <IndeterminateProgressLine visible={this.state.fetching} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularSongs);
