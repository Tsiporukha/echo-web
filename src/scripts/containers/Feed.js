import React, {Component} from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';

import {
  fetchAndReceiveLatestStreams, fetchAndReceivePopularStreams, fetchAndReceiveLongestStreams,
} from '../actions/SubFeedsActions';


const mapStateToProps = state => ({
  latest: state.feedSources.feed.latest,
  popular: state.feedSources.feed.popular,
  longest: state.feedSources.feed.longest,
  initialFilters: {limit: 5, offset: 0},
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveStreams: action => (filters, token) => dispatch(action(filters, token)),
  fetchAndReceiveLatestStreamsAction: fetchAndReceiveLatestStreams,
  fetchAndReceivePopularStreamsAction: fetchAndReceivePopularStreams,
  fetchAndReceiveLongestStreamsAction: fetchAndReceiveLongestStreams,
});


export default connect(mapStateToProps, mapDispatchToProps)(Feed);
