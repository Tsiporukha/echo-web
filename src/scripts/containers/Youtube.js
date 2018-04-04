import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchSource from '../components/SearchSource';

import {fetchAndReceiveYoutubeSongs} from '../actions/SearchActions';


const mapStateToProps = state => ({
  songs: state.search.youtube,
  searchTerm: state.search.term,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveSongs: filters => dispatch(fetchAndReceiveYoutubeSongs(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchSource);
