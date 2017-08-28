import luch, {getJson} from 'luch';
import {getAbsoluteUrl, withoutUndefinedParams} from './api';

export const getUser = (id, token) => luch.get(getAbsoluteUrl(`/users/${id}`), withoutUndefinedParams({token})).then(getJson);

export const follow = (id, token) => luch.post(getAbsoluteUrl(`/users/${id}/follow`), {token});
export const unfollow = (id, token) => luch.post(getAbsoluteUrl(`/users/${id}/unfollow`), {token});


export const getLikedSongs = (id, limit, offset, token) =>
  luch.get(getAbsoluteUrl(`/users/${id}/liked_songs`), withoutUndefinedParams({limit, offset, token})).then(getJson);

export const getLikedStreams = (id, limit, offset, token) =>
  luch.get(getAbsoluteUrl(`/users/${id}/liked_streams`), withoutUndefinedParams({limit, offset, token})).then(getJson);
