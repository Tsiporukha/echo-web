import luch, {getJson} from 'luch';
import {getAbsoluteUrl} from './api';

export const get = filters => luch.get(getAbsoluteUrl('/streams'), filters).then(getJson);
