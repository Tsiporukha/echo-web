import React, {Component} from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';

import {
  fetchAndReceiveLatestStreams, fetchAndReceivePopularStreams, fetchAndReceiveLongestStreams
} from '../actions/SubFeedsActions';


const mapStateToProps = store => ({
  latest: store.feedSources.feed.latest,
  popular: store.feedSources.feed.popular,
  longest: store.feedSources.feed.longest,
  initialFilters: {limit:5, offset: 0}
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveStreams: action => filters => dispatch(action(filters)),
  fetchAndReceiveLatestStreamsAction: fetchAndReceiveLatestStreams,
  fetchAndReceivePopularStreamsAction: fetchAndReceivePopularStreams,
  fetchAndReceiveLongestStreamsAction: fetchAndReceiveLongestStreams
});


export default connect(mapStateToProps, mapDispatchToProps)(Feed);
