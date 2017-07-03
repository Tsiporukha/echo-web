import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Song from '../components/Song';

import {removeStreamSong} from '../actions/QueueActions';
import {setCurrentSong, pause, play} from '../actions/PlayerActions';


const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.id],
  isCurrentSong: state.player.currentSong.id === ownProps.id,
  isPlaying: state.player.playing && (state.player.currentSong.id === ownProps.id),
  inQueue: true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(removeStreamSong(ownProps.playlist, ownProps.id)),
  setCurrentSong: song => () => dispatch(setCurrentSong(song)),

  play: () => dispatch(play()),
  pause: () => dispatch(pause())
});


const QueueStreamSong = connect(mapStateToProps, mapDispatchToProps)(Song);

QueueStreamSong.propTypes = {
  playlist: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default QueueStreamSong;
