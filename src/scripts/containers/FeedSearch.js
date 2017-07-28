import React, {Component} from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';

import {
  fetchAndReceiveLatestStreamsSearch, fetchAndReceivePopularStreamsSearch, fetchAndReceiveLongestStreamsSearch
} from '../actions/SearchActions';


const mapStateToProps = state => ({
  latest: state.search.latest,
  popular: state.search.popular,
  longest: state.search.longest,
  initialFilters: {limit:5, offset: 0, term: state.search.term},
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveStreams: action => (filters, token) => dispatch(action(filters, token)),
  fetchAndReceiveLatestStreamsAction: fetchAndReceiveLatestStreamsSearch,
  fetchAndReceivePopularStreamsAction: fetchAndReceivePopularStreamsSearch,
  fetchAndReceiveLongestStreamsAction: fetchAndReceiveLongestStreamsSearch
});


export default connect(mapStateToProps, mapDispatchToProps)(Feed);
