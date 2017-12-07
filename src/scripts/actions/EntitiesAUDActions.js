import {
  ADD_USERS, UPDATE_USERS, DELETE_USERS,
  ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS,
  ADD_ROOMS, UPDATE_ROOMS, DELETE_ROOMS,
  ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS,
  ADD_SONGS, UPDATE_SONGS, DELETE_SONGS,
  ADD_COMMENTS, UPDATE_COMMENTS, DELETE_COMMENTS,
} from '../constants/ActionTypes';

import {User, Room, Stream, Playlist, Song, Comment} from '../constants/creatorsArgs';

import {createAUDActions} from './actionsCreators';

import {createIdKeyHash, reduceToObject} from '../lib/base';
import {reduceToNormalized as reduceToNormalizedRooms} from '../lib/room';
import {appendPublishedCommentRef, appendCommentsRefs, reduceToNormalized as reduceToNormalizedStreams} from '../lib/stream';
import {addComment as publishComment, getComments, getStream} from '../lib/ebApi/streams';
import {follow, unfollow, getLikedSongs, getLikedStreams} from '../lib/ebApi/users';
import {toggleLike as apiToggleSongLike} from '../lib/ebApi/songs';


export const {addUsers, updateUsers, deleteUsers} = createAUDActions(User)(ADD_USERS, UPDATE_USERS, DELETE_USERS);
export const {addRooms, updateRooms, deleteRooms} = createAUDActions(Room)(ADD_ROOMS, UPDATE_ROOMS, DELETE_ROOMS,);
export const {addStreams, updateStreams, deleteStreams} = createAUDActions(Stream)(ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS);
export const {addPlaylists, updatePlaylists, deletePlaylists} = createAUDActions(Playlist)(ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS);
export const {addSongs, updateSongs, deleteSongs} = createAUDActions(Song)(ADD_SONGS, UPDATE_SONGS, DELETE_SONGS);
export const {addComments, updateComments, deleteComments} = createAUDActions(Comment)(ADD_COMMENTS, UPDATE_COMMENTS, DELETE_COMMENTS);


/// Comments
const receiveComments = comments => dispatch => Promise.resolve(dispatch(addUsers(reduceToObject(comments.map(comment => comment.user)))))
  .then(_ => dispatch(addComments(reduceToObject(comments.map(comment => ({...comment, user: comment.user.id}))))));
const updateStreamOnCommentsAction = appendCommentsRefsFn => (stream, commentsIds) => dispatch =>
  dispatch(updateStreams(createIdKeyHash(appendCommentsRefsFn(stream, commentsIds))));
const receiveCommentsAndUpdateStream = (stream, comments) => appendCommentsRefsFn => dispatch =>
  receiveComments(comments)(dispatch).then(_ => updateStreamOnCommentsAction(appendCommentsRefsFn)(stream, comments.map(comment => comment.id))(dispatch));

export const addComment = (stream, body, token) => dispatch => publishComment(stream.id, body, token)
  .then(comment => receiveCommentsAndUpdateStream(stream, [comment])(appendPublishedCommentRef)(dispatch));

export const fetchComments = (stream, limit, offset) => dispatch => getComments(stream.id, limit, offset)
  .then(data => receiveCommentsAndUpdateStream(stream, data.comments.slice().reverse())(appendCommentsRefs)(dispatch));
/// end Comments


/// Followers
const incrOrDecrFollowersCount = (count, isFollowed) => count + (isFollowed ? +1 : -1);
const updateIsFollowed = (user, is_followed, incFollowersCount) => dispatch =>
  dispatch(updateUsers(createIdKeyHash({...user, is_followed, followers_count: incrOrDecrFollowersCount(user.followers_count, is_followed)})));
const maybeUpdateIsFollowed = (user, is_followed) => resp => resp.status === 200 ? updateIsFollowed(user, is_followed) : false;

export const followUser = (user, token) => dispatch => follow(user.id, token).then(resp => maybeUpdateIsFollowed(user, true)(resp)(dispatch));
export const unfollowUser = (user, token) => dispatch => unfollow(user.id, token).then(resp => maybeUpdateIsFollowed(user, false)(resp)(dispatch));
/// end Followers


/// Songs
const updateSongOnToggleLike = song => dispatch =>
  dispatch(updateSongs(createIdKeyHash({...song, liked: !song.liked, likers_count: song.likers_count + (song.liked ? -1 : 1)})));
export const toggleSongLike = (song, token) => dispatch =>
  apiToggleSongLike(song.id, token).then(resp => resp.status === 200 ? updateSongOnToggleLike(song)(dispatch) : false);

export const receiveSongs = songs => dispatch => dispatch(addSongs(reduceToObject(songs)));

export const fetchAndReceiveLikedSongsIds = (userId, limit, offset, token) => dispatch => getLikedSongs(userId, limit, offset, token)
  .then(({songs}) => Promise.resolve(dispatch(receiveSongs(songs)))
    .then(_ => songs.map(song => song.id)));
/// end Songs


/// Streams
export const addNormalizedStreamsData = ({users, streams, playlists, songs, comments}) => dispatch =>
  Promise.resolve(dispatch(addUsers(users)))
    .then(dispatch(addSongs(songs)))
    .then(dispatch(addComments(comments)))
    .then(dispatch(addPlaylists(playlists)))
    .then(dispatch(addStreams(streams)));

export const receiveStreams = streams => addNormalizedStreamsData(reduceToNormalizedStreams(streams));

export const fetchStream = (id, token) => dispatch => getStream(id, token).then(stream => receiveStreams([stream])(dispatch));

export const fetchAndReceiveLikedStreamsIds = (userId, limit, offset, token) => dispatch => getLikedStreams(userId, limit, offset, token)
  .then(({streams}) => Promise.resolve(dispatch(receiveStreams(streams)))
    .then(_ => streams.map(stream => stream.id)));
/// end Streams


/// Rooms
export const normalizeAndAddRooms = rooms => dispatch => Promise.resolve(reduceToNormalizedRooms(rooms))
  .then(({songs, playlists, rooms}) => Promise.resolve(dispatch(addSongs(songs)))
    .then(dispatch(addPlaylists(playlists)))
    .then(dispatch(addRooms(rooms)))
  );

/// end Rooms
