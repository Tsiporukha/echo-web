import luch, {getJson} from 'luch';
import {getAbsoluteUrl, withoutUndefinedParams} from './api';

export const getUser = (id, token) => luch.get(getAbsoluteUrl(`/users/${id}`), withoutUndefinedParams({token})).then(getJson);
