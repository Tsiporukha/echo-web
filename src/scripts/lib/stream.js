import {playlistDuration, duration} from './duration';

export const createIdKeyHash = item => ({[item.id]: item});

export const reduceToObject = items => items.reduce((itms, itm) => ({...itms, ...createIdKeyHash(itm)}), {});

const replaceCommentUserWithRefId = comment => ({...comment, user: comment.user.id});
const getCommentUser = comment => comment.user;

export const normalize = stream => ({
  users: stream.comments.map(getCommentUser).concat(stream.user),
  stream: {...stream, playlist: stream.playlist.id, user: stream.user.id, comments: stream.comments.slice().reverse().map(cmmnt => cmmnt.id)},
  playlist: {...stream.playlist, songs: stream.playlist.songs.map(song => song.id)},
  songs: stream.playlist.songs,
  comments: stream.comments.map(replaceCommentUserWithRefId),
});

const addToNormalized = (nrmlzdData, {users, stream, playlist, songs, comments}) => ({
  streams: {...nrmlzdData.streams, ...createIdKeyHash(stream)},
  playlists: {...nrmlzdData.playlists, ...createIdKeyHash(playlist)},
  users: {...nrmlzdData.users, ...reduceToObject(users)},
  songs: {...nrmlzdData.songs, ...reduceToObject(songs)},
  comments: {...nrmlzdData.comments, ...reduceToObject(comments)}
});

export const reduceToNormalized = streams => streams.reduce(
  (nrmlzdData, stream) => addToNormalized(nrmlzdData, normalize(stream)),
  {users: {}, streams: {}, playlists: {}, songs: {}, comments: {}}
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

export const maybeGetStreamAndNestedEntities = (state, id) => state.streams[id] ? getStreamAndNestedEntities(state, id) : {};

export const maybeGetDefaultArtwork = str => str || require('../../assets/images/no_artwork.png');

export const appendCommentsRefs = (stream, commentsIds) => ({...stream, comments: commentsIds.concat(stream.comments)})
export const appendPublishedCommentRef = (stream, commentId) =>
  ({...stream, comments: stream.comments.concat(commentId), comments_count: stream.comments_count + 1});
