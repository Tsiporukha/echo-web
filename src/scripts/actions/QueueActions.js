import {
  ADD_TO_QUEUE, ADD_TO_QUEUE_TOP, REMOVE_FROM_QUEUE, SET_QUEUE
} from '../constants/ActionTypes';

import {Queue} from '../constants/creatorsArgs';

import {createSubFeedActions} from './actionsCreators';

import {addRooms, addStreams, addPlaylists, addSongs, updatePlaylists} from './EntitiesAUDActions';
import {setCurrentSong} from './PlayerActions';

import {create as createStream} from '../lib/ebApi/streams';
import {addId as clone, reduceToObject} from '../lib/base';

import v4 from 'uuid/v4';


export const {setQueue: set, addToQueue: add, removeFromQueue: remove} = createSubFeedActions(Queue)(SET_QUEUE, ADD_TO_QUEUE, REMOVE_FROM_QUEUE);

export const addToTop = references => ({
  type: ADD_TO_QUEUE_TOP,
  payload: references
});



/// Songs
const dispatchSongs = action => songs => dispatch => {
  dispatch(addSongs(reduceToObject(songs)));
  return dispatch(action(songs.map(song => ({id: song.id, type: 'song'}))));
}

const dispatchClonedSongs = action => songs => dispatchSongs(action)(songs.map(clone))
export const addClonedSongs = dispatchClonedSongs(add);
export const addClonedSongsToTop = dispatchClonedSongs(addToTop);


export const addClonedSongsToTopAndPlay = songs => dispatch => {
  const sngs = songs.map(clone);
  dispatchSongs(addToTop)(sngs)(dispatch);
  return dispatch(setCurrentSong(sngs[0]));
};
export const addClonedSongToTopAndPlay = song => addClonedSongsToTopAndPlay([song]);
/// end Songs



export const removePlaylistSong = (playlist, songId) =>
  updatePlaylists({[playlist.id]: {...playlist, songs: playlist.songs.filter(sid => sid !== songId)}});

const dispatchStream = action => (stream, playlist, songs) => dispatch => {
  dispatch(addSongs(reduceToObject(songs)));
  dispatch(addPlaylists(reduceToObject([playlist])));
  dispatch(addStreams(reduceToObject([stream])));
  return dispatch(action([{id: stream.id, type: 'stream'}]));
};

const dispatchRoom = action => (room, playlist, songs) => dispatch => {
  dispatch(addSongs(reduceToObject(songs)));
  dispatch(addPlaylists(reduceToObject([playlist])));
  dispatch(addRooms(reduceToObject([room])));
  return dispatch(action([{id: room.id, type: 'room'}]));
};


/// PlaylistHolder
// data PlaylistHolder a Playlist [Song] = Stream a Playlist [Song] | Room a Playlist [Song]

// clonePlHolder :: (a, Playlist, [Song]) -> {holder: a, playlist: Playlist, songs: [Song]}
const clonePlHolder = (holder, playlist, songs) => {
  const sngs = songs.map(clone),
    pllst = {...clone(playlist),songs: sngs.map(song => song.id)},
    hldr = {...clone(holder), playlist: pllst.id, parentId: holder.id};
  return {holder: hldr, playlist: pllst, songs: sngs};
};

// playlistHolderObjToArr :: {holder: a, playlist: Playlist, songs: [Song]} -> [a, Playlist, [Song]]
const playlistHolderObjToArr = phObj => [phObj.holder, phObj.playlist, phObj.songs];

const dispatchClonedPlaylistHolder = action => phType => (holder, playlist, songs) =>
  dispatchPlaylistHolder[phType](action)(...playlistHolderObjToArr(clonePlHolder(holder, playlist, songs)));
export const addClonedPlaylistHolder = dispatchClonedPlaylistHolder(add);
export const addClonedPlaylistHolderToTop = dispatchClonedPlaylistHolder(addToTop);

export const addClonedPlaylistHolderToTopAndPlay = phType => (holder, playlist, songs) => dispatch => {
  const {holder: hldr, playlist: pllst, songs: sngs} = clonePlHolder(holder, playlist, songs);
  dispatchPlaylistHolder[phType](addToTop)(hldr, pllst, sngs)(dispatch);
  return dispatch(setCurrentSong(sngs[0]));
};

const dispatchPlaylistHolder = {
  stream: dispatchStream,
  room: dispatchRoom,
};
/// end PlaylistHolder
