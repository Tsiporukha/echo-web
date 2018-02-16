import luch, {getJson} from 'luch';
import {withApiUrl} from './api';

export const toggleLike = (id, token) => luch.post(withApiUrl(`/songs/${id}/toggle_like`), {token});

export const getPopular = (term, limit, offset, token) =>
  luch.get(withApiUrl('/songs/popular'), {term, limit, offset, token})
    .then(getJson);
