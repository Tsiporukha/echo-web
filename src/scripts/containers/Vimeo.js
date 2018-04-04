import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchSource from '../components/SearchSource';

import {fetchAndReceiveVimeoSongs} from '../actions/SearchActions';


const mapStateToProps = state => ({
  songs: state.search.vimeo,
  searchTerm: state.search.term,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveSongs: filters => dispatch(fetchAndReceiveVimeoSongs(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchSource);
