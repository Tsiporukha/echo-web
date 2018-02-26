import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchSource from '../components/SearchSource';

import {fetchAndReceiveVimeoSongs} from '../actions/SearchActions';


const mapStateToProps = store => ({
  songs: store.search.vimeo,
  searchTerm: store.search.term,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveSongs: filters => dispatch(fetchAndReceiveVimeoSongs(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchSource);
