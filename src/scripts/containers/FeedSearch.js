import React, {Component} from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';

import {
  fetchAndReceiveLatestStreamsSearch, fetchAndReceivePopularStreamsSearch, fetchAndReceiveLongestStreamsSearch
} from '../actions/SearchActions';


const mapStateToProps = store => ({
  latest: store.search.latest,
  popular: store.search.popular,
  longest: store.search.longest,
  initialFilters: {limit:5, offset: 0, term: store.search.term}
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveStreams: action => filters => dispatch(action(filters)),
  fetchAndReceiveLatestStreamsAction: fetchAndReceiveLatestStreamsSearch,
  fetchAndReceivePopularStreamsAction: fetchAndReceivePopularStreamsSearch,
  fetchAndReceiveLongestStreamsAction: fetchAndReceiveLongestStreamsSearch
});


export default connect(mapStateToProps, mapDispatchToProps)(Feed);
