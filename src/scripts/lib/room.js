import {createIdKeyHash, reduceToObject} from './stream';
import {playlistDuration, duration} from './duration';


export const normalize = room => ({
  room: {...room, playlist: room.playlist.id},
  playlist: {...room.playlist, songs: room.playlist.songs.map(song => song.id)},
  songs: room.playlist.songs,
});

const addToNormalized = (nrmlzdData, {users, room, playlist, songs, comments}) => ({
  rooms: {...nrmlzdData.rooms, ...createIdKeyHash(room)},
  playlists: {...nrmlzdData.playlists, ...createIdKeyHash(playlist)},
  songs: {...nrmlzdData.songs, ...reduceToObject(songs)},
});

export const reduceToNormalized = rooms => rooms.reduce(
  (nrmlzdData, room) => addToNormalized(nrmlzdData, normalize(room)),
  {rooms: {}, playlists: {}, songs: {},}
);



const inQueue = (state, id) => state.playlists[state.rooms[id].playlist].songs.some(songId => state.songs[songId].uid === state.player.currentSong.uid);


export const getWithNestedEntities = (state, id) => ({
  room:  state.rooms[id],
  playlist: state.playlists[state.rooms[id].playlist],
  duration: duration(playlistDuration(state.playlists[state.rooms[id].playlist].songs.map(song => state.songs[song]))),
  songs: state.playlists[state.rooms[id].playlist].songs.map(song => state.songs[song]),
  inQueue: inQueue(state, id),
  isPlaying: inQueue(state, id) && state.player.playing
});

export const maybeGetWithNestedEntities = (state, id) => state.rooms[id] ? getWithNestedEntities(state, id) : {};
