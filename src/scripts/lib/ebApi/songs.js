import luch, {getJson} from 'luch';
import {getAbsoluteUrl, withoutUndefinedParams} from './api';

export const toggleLike = (id, token) => luch.post(getAbsoluteUrl(`/songs/${id}/toggle_like`), {token});

export const getPopular = (term, limit, offset, token) =>
  luch(getAbsoluteUrl(`/songs/popular?limit=${limit}&offset=${offset}` +
    `${token ? `&token=${token}` : ''}${term ? `&term=${term}` : ''}`))
      .then(getJson);
