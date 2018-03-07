import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Song from '../components/Song';

import {toggleSongLike} from '../actions/EntitiesAUDActions';
import {addClonedSongToTopAndPlay, removePlaylistSong} from '../actions/QueueActions';
import {pause, play} from '../actions/PlayerActions';


const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.id],
  isCurrentSong: state.songs[ownProps.id].uid === state.player.currentSong.uid,
  isPlaying: state.player.playing && state.songs[ownProps.id].uid === state.player.currentSong.uid,
  // rename to inPlaylist
  inQueue: true,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(removePlaylistSong(ownProps.playlist, ownProps.id)),
  play: () => dispatch(play()),
  setCurrentSong: song => () => dispatch(addClonedSongToTopAndPlay(song)),
  toggleLike: (song, token) => dispatch(toggleSongLike(song, token)),

  pause: () => dispatch(pause()),
});


const PlaylistHolderSong = connect(mapStateToProps, mapDispatchToProps)(Song);

PlaylistHolderSong.propTypes = {
  playlist: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default PlaylistHolderSong;
