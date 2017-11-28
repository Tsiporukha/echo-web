import luch, {getJson, withoutUndefinedParams} from 'luch';

import {getAbsoluteUrl} from './api';

// roomsUrl :: String
const roomsUrl = getAbsoluteUrl(`/rooms`);
// withRoomsUrl :: String -> String
const withRoomsUrl = path => `${roomsUrl}${path}`;


// create :: (String, String, String, String, String, [String], [Hash], String) -> Promise(Object)
export const create = (artwork_url, background_url, title, description, genre, tags, songs, token) =>
  luch(roomsUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({artwork_url, background_url, title, description, genre, tags, songs, token}),
    }).then(getJson);

// withGenre :: (Hash, String) -> Promise(Object)
export const withGenre = (filters, token) => luch.get(withRoomsUrl('/with_genre'), withoutUndefinedParams({...filters, token})).then(getJson);
