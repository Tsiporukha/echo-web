import luch, {getJson} from 'luch';
import {getAbsoluteUrl} from './api';

export const get = filters => luch.get(getAbsoluteUrl('/streams'), filters).then(getJson);
export const getPopular = filters => luch.get(getAbsoluteUrl('/streams/popular'), filters).then(getJson);
export const getLongest = filters => luch.get(getAbsoluteUrl('/streams/longest'), filters).then(getJson);

export const search = filters => luch.post(getAbsoluteUrl('/streams/search'), {term: filters.term}).then(getJson);

export const uploadArtwork = (image, token, key = `data/atrworks/${v4()}${image.name}`) =>
  luch.post(getAbsoluteUrl('/lists/upload_song_artwork'), {image, token, key})
    .then(_ => ({artwork_url: `https://s3.amazonaws.com/echoapp-userdata-production/${key}`}));
