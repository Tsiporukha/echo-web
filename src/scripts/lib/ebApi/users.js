import luch, {getJson} from 'luch';
import {getAbsoluteUrl, withoutUndefinedParams} from './api';

export const getUser = (id, token) => luch.get(getAbsoluteUrl(`/users/${id}`), withoutUndefinedParams({token})).then(getJson);

export const follow = (id, token) => luch.post(getAbsoluteUrl(`/users/${id}/follow`), {token});
export const unfollow = (id, token) => luch.post(getAbsoluteUrl(`/users/${id}/unfollow`), {token});


export const getLikedSongs = (id, limit, offset, token) =>
  luch.get(getAbsoluteUrl(`/users/${id}/liked_songs`), withoutUndefinedParams({limit, offset, token})).then(getJson);

export const getLikedStreams = (id, limit, offset, token) =>
  luch.get(getAbsoluteUrl(`/users/${id}/liked_streams`), withoutUndefinedParams({limit, offset, token})).then(getJson);

export const getNotifications = token => luch.get(getAbsoluteUrl(`/me/read_pushes`), {token}).then(getJson);
export const readNotifications = (ids, token) => luch.post(getAbsoluteUrl(`/me/mark_readed_pushes`), {ids, token});

export const getSimilar = (id, token) => luch.get(getAbsoluteUrl(`/users/${id}/similar`), withoutUndefinedParams({token})).then(getJson);
