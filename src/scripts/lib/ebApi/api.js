const SERVER_URL = 'https://api.echoapplication.com';
const API_VERSION = '/v1';

export const getAbsoluteUrl = (path, apiV = API_VERSION) => `${SERVER_URL}${apiV}${path}`;
