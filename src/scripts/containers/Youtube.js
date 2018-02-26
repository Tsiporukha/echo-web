import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchSource from '../components/SearchSource';

import {fetchAndReceiveYoutubeSongs} from '../actions/SearchActions';


const mapStateToProps = store => ({
  songs: store.search.youtube,
  searchTerm: store.search.term,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveSongs: filters => dispatch(fetchAndReceiveYoutubeSongs(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchSource);
