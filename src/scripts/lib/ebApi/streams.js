import luch, {getJson} from 'luch';
import v4 from 'uuid/v4';
import {getAbsoluteUrl, withoutUndefinedParams} from './api';


export const get = (filters, token) => luch.get(getAbsoluteUrl('/streams'), withoutUndefinedParams({...filters, token})).then(getJson);
export const getStream = (id, token) => luch.get(getAbsoluteUrl(`/streams/${id}`), withoutUndefinedParams({token})).then(getJson);
//export const getPopular = (filters, token) => luch.get(getAbsoluteUrl('/streams/popular'), withoutUndefinedParams({...filters, token})).then(getJson);
//export const getLongest = (filters, token) => luch.get(getAbsoluteUrl('/streams/longest'), withoutUndefinedParams({...filters, token})).then(getJson);
//export const getLatest = (filters, token) => luch.get(getAbsoluteUrl('/streams/latest'), withoutUndefinedParams({...filters, token})).then(getJson);
const getRoute = route => (filters, token) => luch.get(getAbsoluteUrl(`/streams/${route}`), withoutUndefinedParams({...filters, token})).then(getJson);
export const getPopular = getRoute('popular');
export const getLongest = getRoute('longest');
export const getLatest = getRoute('latest');



export const search = (filters, token) => luch.post(getAbsoluteUrl('/streams/search'), withoutUndefinedParams({term: filters.term, token})).then(getJson);

export const uploadArtwork = (image, token, key = `data/atrworks/${v4()}${image.name}`) =>
  luch.post(getAbsoluteUrl('/lists/upload_song_artwork'), {image, token, key})
    .then(_ => ({artwork_url: `https://s3.amazonaws.com/echoapp-userdata-production/${key}`}));


const stringifyStreamBody = (playlist_title, playlist_description, tags, default_artwork_url, songs, token) =>
  JSON.stringify({playlist_title, playlist_description, tags: tags.join(), default_artwork_url, songs, token});

export const create = (playlist_title, playlist_description, tags, default_artwork_url, songs, token) =>
  luch(getAbsoluteUrl('/streams'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: stringifyStreamBody(playlist_title, playlist_description, tags, default_artwork_url, songs, token),
    });

export const update = (streamId, playlist_title, playlist_description, tags, default_artwork_url, songs, token) =>
  luch(getAbsoluteUrl(`/streams/${streamId}`), {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: stringifyStreamBody(playlist_title, playlist_description, tags, default_artwork_url, songs, token),
  }).then(getJson);


export const like = (id, token) => luch.post(getAbsoluteUrl(`/streams/${id}/add_like`), {token});
export const unlike = (id, token) => luch.post(getAbsoluteUrl(`/streams/${id}/remove_like`), {token});

export const getComments = (id, limit, offset) => luch.get(getAbsoluteUrl(`/streams/${id}/comments`), {limit, offset}).then(getJson);
export const addComment = (id, body, token) => luch.post(getAbsoluteUrl(`/streams/${id}/add_comment`), {body, token}).then(getJson);
