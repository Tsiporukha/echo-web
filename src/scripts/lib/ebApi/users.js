import luch, {getJson} from 'luch';
import {getAbsoluteUrl, withoutUndefinedParams} from './api';

export const getUser = (id, token) => luch.get(getAbsoluteUrl(`/users/${id}`), withoutUndefinedParams({token})).then(getJson);

export const follow = (id, token) => luch.post(getAbsoluteUrl(`/users/${id}/follow`), {token});
export const unfollow = (id, token) => luch.post(getAbsoluteUrl(`/users/${id}/unfollow`), {token});
