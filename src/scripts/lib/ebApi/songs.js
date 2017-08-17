import luch, {getJson} from 'luch';
import {getAbsoluteUrl} from './api';

export const toggleLike = (id, token) => luch.post(getAbsoluteUrl(`/songs/${id}/toggle_like`), {token});
