import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Song from '../components/Song';

import {removePlaylistSong} from '../actions/QueueActions';
import {setCurrentSong, pause, play} from '../actions/PlayerActions';


const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.id],
  isCurrentSong: state.player.currentSong.id === ownProps.id,
  isPlaying: state.player.playing && (state.player.currentSong.id === ownProps.id),
  inQueue: true,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(removePlaylistSong(ownProps.playlist, ownProps.id)),
  setCurrentSong: song => () => dispatch(setCurrentSong(song)),

  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
});


const QueuePlaylistHolderSong = connect(mapStateToProps, mapDispatchToProps)(Song);

QueuePlaylistHolderSong.propTypes = {
  playlist: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default QueuePlaylistHolderSong;
