import luch, {removeUndefinedAttrs, getJson} from 'luch';
import {withApiUrl} from './api';


export const getUser = (id, token) => luch.get(withApiUrl(`/users/${id}`), removeUndefinedAttrs({token})).then(getJson);

export const follow = (id, token) => luch.post(withApiUrl(`/users/${id}/follow`), {token});
export const unfollow = (id, token) => luch.post(withApiUrl(`/users/${id}/unfollow`), {token});


export const getLikedSongs = (id, limit, offset, token) =>
  luch.get(withApiUrl(`/users/${id}/liked_songs`), removeUndefinedAttrs({limit, offset, token})).then(getJson);

export const getLikedStreams = (id, limit, offset, token) =>
  luch.get(withApiUrl(`/users/${id}/liked_streams`), removeUndefinedAttrs({limit, offset, token})).then(getJson);

export const getNotifications = token => luch.get(withApiUrl('/me/read_pushes'), {token}).then(getJson);
export const readNotifications = (ids, token) => luch.post(withApiUrl('/me/mark_readed_pushes'), {ids, token});

export const getSimilar = (id, token) => luch.get(withApiUrl(`/users/${id}/similar`), removeUndefinedAttrs({token})).then(getJson);

export const updateCurrentUser = (user, token) =>
  luch(
    withApiUrl('/me/update_profile'),
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token, user: removeUndefinedAttrs(user)}),
    }
  ).then(getJson);
