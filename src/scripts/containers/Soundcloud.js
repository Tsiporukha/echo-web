import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchSource from '../components/SearchSource';

import {fetchAndReceiveSoundcloudSongs} from '../actions/SearchActions';


const mapStateToProps = state => ({
  songs: state.search.soundcloud,
  searchTerm: state.search.term,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveSongs: filters => dispatch(fetchAndReceiveSoundcloudSongs(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchSource);
