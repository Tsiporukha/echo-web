import React, {Component} from 'react';
import {connect} from 'react-redux';

import Song from '../components/Song';

import {addClonedSongs, addClonedSongToTopAndPlay, remove as removeFromQueue} from '../actions/QueueActions';
import {setCurrentSong, pause, play} from '../actions/PlayerActions';
import {toggleSongLike} from '../actions/EntitiesAUDActions';


const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.id],
  isCurrentSong: state.songs[ownProps.id].uid === state.player.currentSong.uid,
  isPlaying: state.player.playing && state.songs[ownProps.id].uid === state.player.currentSong.uid,
  inQueue: false,
  token: state.session.token,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToQueue: song => () =>  dispatch(addClonedSongs([song])),
  play: () => dispatch(play()),
  setCurrentSong: song => () => dispatch(addClonedSongToTopAndPlay(song)),
  toggleLike: (song, token) => dispatch(toggleSongLike(song, token)),

  pause: () => dispatch(pause())
});


export default connect(mapStateToProps, mapDispatchToProps)(Song);
