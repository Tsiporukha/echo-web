import {playlistDuration, duration} from './duration';
import {createIdKeyHash, reduceToObject, inQueue, getAttr} from './base';
import {getAssetUrl} from './assets';

const replaceCommentUserWithRefId = comment => ({...comment, user: comment.user.id});

export const normalize = stream => ({
  users: stream.comments.map(getAttr('user')).concat(stream.user),
  stream: {...stream, playlist: stream.playlist.id, user: stream.user.id, comments: stream.comments.map(getAttr('id')).reverse()},
  playlist: {...stream.playlist, songs: stream.playlist.songs.map(getAttr('id'))},
  songs: stream.playlist.songs,
  comments: stream.comments.map(replaceCommentUserWithRefId),
});

const addToNormalized = (nrmlzdData, {users, stream, playlist, songs, comments}) => ({
  streams: {...nrmlzdData.streams, ...createIdKeyHash(stream)},
  playlists: {...nrmlzdData.playlists, ...createIdKeyHash(playlist)},
  users: {...nrmlzdData.users, ...reduceToObject(users)},
  songs: {...nrmlzdData.songs, ...reduceToObject(songs)},
  comments: {...nrmlzdData.comments, ...reduceToObject(comments)},
});

export const reduceToNormalized = streams => streams.reduce(
  (nrmlzdData, stream) => addToNormalized(nrmlzdData, normalize(stream)),
  {users: {}, streams: {}, playlists: {}, songs: {}, comments: {}}
);

export const getWithNestedEntities = (state, id) => ({
  stream: state.streams[id],
  user: state.users[state.streams[id].user],
  playlist: state.playlists[state.streams[id].playlist],
  duration: duration(playlistDuration(state.playlists[state.streams[id].playlist].songs.map(song => state.songs[song]))),
  songs: state.playlists[state.streams[id].playlist].songs.map(song => state.songs[song]),
  inQueue: inQueue('streams', state, id),
  isPlaying: inQueue('streams', state, id) && state.player.playing,
});

export const maybeGetWithNestedEntities = (state, id) => state.streams[id] ? getWithNestedEntities(state, id) : {};

export const maybeGetDefaultArtwork = str => str || getAssetUrl('/images/no_artwork.png');

export const appendCommentsRefs = (stream, commentsIds) => ({...stream, comments: commentsIds.concat(stream.comments)});
export const appendPublishedCommentRef = (stream, commentId) =>
  ({...stream, comments: stream.comments.concat(commentId), comments_count: stream.comments_count + 1});


export const handleLike = stream => createIdKeyHash({...stream, likes_count: stream.likes_count + 1, your_likes: 1});
export const handleUnlike = stream => createIdKeyHash({...stream, likes_count: stream.likes_count - 1, your_likes: 0});
