import luch, {getAbsoluteUrl, removeUndefinedAttrs, getJson, stryForBody} from 'luch';
import v4 from 'uuid/v4';
import {withApiUrl} from './api';

// withStreamsUrl :: String -> String
const withStreamsUrl = getAbsoluteUrl(withApiUrl('/streams'));
// (Number, String) -> String
const withStreamUrl = (streamId, path = '') => withStreamsUrl(`/${streamId}${path}`);


export const get = (filters, token) =>
  luch.get(withStreamsUrl(''), removeUndefinedAttrs({...filters, token})).then(getJson);
export const getStream = (id, token) =>
  luch.get(withStreamUrl(id), removeUndefinedAttrs({token})).then(getJson);


const getRoute = route => (filters, token) =>
  luch.get(withStreamsUrl(`/${route}`), removeUndefinedAttrs({...filters, token}))
    .then(getJson);

export const getPopular = getRoute('popular');
export const getLongest = getRoute('longest');
export const getLatest = getRoute('latest');


export const search = (filters, token) =>
  luch.post(withStreamsUrl('/search'), removeUndefinedAttrs({term: filters.term, token}))
    .then(getJson);

export const uploadArtwork = (image, token, key = `data/atrworks/${v4()}${image.name}`) =>
  luch.post(withApiUrl('/lists/upload_song_artwork'), {image, token, key})
    .then(() => ({artwork_url: `https://s3.amazonaws.com/echoapp-userdata-production/${key}`}));


export const create = (
  playlist_title, playlist_description, tags, default_artwork_url, songs, token
) => luch(
  withStreamsUrl(),
  stryForBody(
    {playlist_title, playlist_description, tags: tags.join(), default_artwork_url, songs, token},
    'POST'
  )
);


export const update = (
  streamId, playlist_title, playlist_description, tags, default_artwork_url, songs, token
) => luch(
  withStreamUrl(streamId),
  stryForBody(
    {playlist_title, playlist_description, tags: tags.join(), default_artwork_url, songs, token},
    'PUT',
  )
).then(getJson);


export const like = (id, token) => luch.post(withStreamUrl(id, '/add_like'), {token});
export const unlike = (id, token) => luch.post(withStreamUrl(id, '/remove_like'), {token});

export const getComments = (id, limit, offset) =>
  luch.get(withStreamUrl(id, '/comments'), {limit, offset}).then(getJson);
export const addComment = (id, body, token) =>
  luch.post(withStreamUrl(id, '/add_comment'), {body, token}).then(getJson);
