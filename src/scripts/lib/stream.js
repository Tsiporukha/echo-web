import {playlistDuration, duration} from './duration';

export const createIdKeyHash = item => ({[item.id]: item});

export const normalize = stream => ({
  user: stream.user,
  stream: {...stream, playlist: stream.playlist.id, user: stream.user.id},
  playlist: {...stream.playlist, songs: stream.playlist.songs.map(song => song.id)},
  songs: stream.playlist.songs
});

const addToNormalized = (nrmlzdData, {user, stream, playlist, songs}) => (
  {users: {...nrmlzdData.users, ...createIdKeyHash(user)},
  streams: {...nrmlzdData.streams, ...createIdKeyHash(stream)},
  playlists: {...nrmlzdData.playlists, ...createIdKeyHash(playlist)},
  songs: {...nrmlzdData.songs, ...songs.reduce((sngs, sng) => ({...sngs, ...createIdKeyHash(sng)}), {})}
});

export const reduceToNormalized = streams => streams.reduce(
  (nrmlzdData, stream) => addToNormalized(nrmlzdData, normalize(stream)),
  {users: {}, streams: {}, playlists: {}, songs: {}}
);

const inQueue = (state, id) => state.playlists[state.streams[id].playlist].songs.some(songId => state.songs[songId].uid === state.player.currentSong.uid);

export const getStreamAndNestedEntities = (state, id) => ({
  stream:  state.streams[id],
  user: state.users[state.streams[id].user],
  playlist: state.playlists[state.streams[id].playlist],
  duration: duration(playlistDuration(state.playlists[state.streams[id].playlist].songs.map(song => state.songs[song]))),
  songs: state.playlists[state.streams[id].playlist].songs.map(song => state.songs[song]),
  inQueue: inQueue(state, id),
  isPlaying: inQueue(state, id) && state.player.playing
});

export const maybeGetDefaultArtwork = str => str || '/assets/images/no_artwork.png';
