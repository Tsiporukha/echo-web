import {
  ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS,
  ADD_USERS, UPDATE_USERS, DELETE_USERS,
  ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS,
  ADD_SONGS, UPDATE_SONGS, DELETE_SONGS,
  ADD_COMMENTS, UPDATE_COMMENTS, DELETE_COMMENTS,
} from '../constants/ActionTypes';

import {Stream, User, Playlist, Song, Comment} from '../constants/creatorsArgs';

import {createAUDActions} from './actionsCreators';

export const {addStreams, updateStreams, deleteStreams} = createAUDActions(Stream)(ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS);
export const {addUsers, updateUsers, deleteUsers} = createAUDActions(User)(ADD_USERS, UPDATE_USERS, DELETE_USERS);
export const {addPlaylists, updatePlaylists, deletePlaylists} = createAUDActions(Playlist)(ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS);
export const {addSongs, updateSongs, deleteSongs} = createAUDActions(Song)(ADD_SONGS, UPDATE_SONGS, DELETE_SONGS);
export const {addComments, updateComments, deleteComments} = createAUDActions(Comment)(ADD_COMMENTS, UPDATE_COMMENTS, DELETE_COMMENTS);


export const addNormalizedStreamsData = (({users, streams, playlists, songs, comments}) => dispatch =>
  Promise.resolve(dispatch(addUsers(users)))
    .then(dispatch(addStreams(streams)))
    .then(dispatch(addPlaylists(playlists)))
    .then(dispatch(addSongs(songs)))
    .then(dispatch(addComments(comments))));
