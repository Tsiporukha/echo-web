import luch, {getJson} from 'luch';
import {getAbsoluteUrl} from './api';

export const getUser = id => luch.get(getAbsoluteUrl(`/users/${id}`)).then(getJson);
