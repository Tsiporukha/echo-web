import {getAbsoluteUrl} from 'luch';

const SERVER_URL = 'https://api.echoapplication.com';
const API_VERSION = '/v1';

export const withApiUrl = getAbsoluteUrl(`${SERVER_URL}${API_VERSION}`);
