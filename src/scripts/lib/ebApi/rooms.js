import luch, {getAbsoluteUrl, removeUndefinedAttrs, getJson} from 'luch';

import {withApiUrl} from './api';

// roomsUrl :: String
const roomsUrl = withApiUrl('/rooms');
// withRoomsUrl :: String -> String
const withRoomsUrl = getAbsoluteUrl(roomsUrl);
// withRoomUrl :: (Number, String) -> String
const withRoomUrl = (id, path = '') => withRoomsUrl(`/${id}${path}`);

// create :: (String, String, String, String, String, [String], [Hash], String) -> Promise(Object)
export const create = (artwork_url, background_url, title, description, genre, tags, songs, token) =>
  luch(roomsUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({artwork_url, background_url, title, description, genre, tags, songs, token}),
  }).then(getJson);

// create :: (Number, String, String, String, String, String, [String], [Hash], String) -> Promise(Object)
export const update = (roomId, artwork_url, background_url, title, description, genre, tags, songs, token) =>
  luch(withRoomUrl(roomId), {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({artwork_url, background_url, title, description, genre, tags, songs, token}),
  }).then(getJson);

// get :: (Number, String) -> Promise(Object)
export const get = (id, token) => luch.get(withRoomUrl(id), removeUndefinedAttrs({token})).then(getJson);


// withGenre :: (Hash, String) -> Promise(Object)
export const withGenre = (filters, token) => luch.get(withRoomsUrl('/with_genre'), removeUndefinedAttrs({...filters, token})).then(getJson);
