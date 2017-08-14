import {
  ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS,
  ADD_USERS, UPDATE_USERS, DELETE_USERS,
  ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS,
  ADD_SONGS, UPDATE_SONGS, DELETE_SONGS,
  ADD_COMMENTS, UPDATE_COMMENTS, DELETE_COMMENTS,
} from '../constants/ActionTypes';

import {Stream, User, Playlist, Song, Comment} from '../constants/creatorsArgs';

import {createAUDActions} from './actionsCreators';

import {createIdKeyHash, appendCommentRef} from '../lib/stream';
import {addComment as publishComment} from '../lib/ebApi/streams';
import {follow, unfollow} from '../lib/ebApi/users';


export const {addStreams, updateStreams, deleteStreams} = createAUDActions(Stream)(ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS);
export const {addUsers, updateUsers, deleteUsers} = createAUDActions(User)(ADD_USERS, UPDATE_USERS, DELETE_USERS);
export const {addPlaylists, updatePlaylists, deletePlaylists} = createAUDActions(Playlist)(ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS);
export const {addSongs, updateSongs, deleteSongs} = createAUDActions(Song)(ADD_SONGS, UPDATE_SONGS, DELETE_SONGS);
export const {addComments, updateComments, deleteComments} = createAUDActions(Comment)(ADD_COMMENTS, UPDATE_COMMENTS, DELETE_COMMENTS);


export const addComment = (stream, body, token) => dispatch => publishComment(stream.id, body, token)
  .then(comment => Promise.resolve(dispatch(addComments(createIdKeyHash({...comment, user: comment.user.id}))))
    .then(_ => dispatch(updateStreams(createIdKeyHash(appendCommentRef(stream, comment.id))))));


const incrOrDecrFollowersCount = (count, isFollowed) => count + (isFollowed ? +1 : -1);
const updateIsFollowed = (user, is_followed, incFollowersCount) => dispatch =>
  dispatch(updateUsers(createIdKeyHash({...user, is_followed, followers_count: incrOrDecrFollowersCount(user.followers_count, is_followed)})));
const maybeUpdateIsFollowed = (user, is_followed) => resp => resp.status === 200 ? updateIsFollowed(user, is_followed) : false;

export const followUser = (user, token) => dispatch => follow(user.id, token).then(resp => maybeUpdateIsFollowed(user, true)(resp)(dispatch));
export const unfollowUser = (user, token) => dispatch => unfollow(user.id, token).then(resp => maybeUpdateIsFollowed(user, false)(resp)(dispatch));


export const addNormalizedStreamsData = (({users, streams, playlists, songs, comments}) => dispatch =>
  Promise.resolve(dispatch(addUsers(users)))
    .then(dispatch(addStreams(streams)))
    .then(dispatch(addPlaylists(playlists)))
    .then(dispatch(addSongs(songs)))
    .then(dispatch(addComments(comments))));
