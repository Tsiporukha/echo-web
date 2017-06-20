import {
  ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS,
  ADD_USERS, UPDATE_USERS, DELETE_USERS,
  ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS,
  ADD_SONGS, UPDATE_SONGS, DELETE_SONGS
} from '../constants/ActionTypes';

import {createAUDActions} from './actionsCreators';

export const {addStreams, updateStreams, deleteStreams} = createAUDActions('Stream')(ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS);
export const {addUsers, updateUsers, deleteUsers} = createAUDActions('User')(ADD_USERS, UPDATE_USERS, DELETE_USERS);
export const {addPlaylists, updatePlaylists, deletePlaylists} = createAUDActions('Playlist')(ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS);
export const {addSongs, updateSongs, deleteSongs} = createAUDActions('Song')(ADD_SONGS, UPDATE_SONGS, DELETE_SONGS);


export const addNormalizedStreamsData = (({users, streams, playlists, songs}) => dispatch =>
  Promise.resolve(dispatch(addUsers(users)))
    .then(dispatch(addStreams(streams)))
    .then(dispatch(addPlaylists(playlists)))
    .then(dispatch(addSongs(songs))));
