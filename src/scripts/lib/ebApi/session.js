import luch, {getJson} from 'luch';
import {withApiUrl} from './api';

const SIGN_IN_PATH = '/sessions/email_sign_in';
const SIGN_UP_PATH = '/email_auth';
const LOGOUT_PATH = '/exit';


export const getToken = (email, password) => luch.post(withApiUrl(SIGN_IN_PATH), {email, password})
  .then(getJson).then(data => data.token || Promise.reject(data));

export const getCurrentUserData = token => luch.get(withApiUrl('/me'), {token})
  .then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp));

const getCurrentUserDataWithToken = token => getCurrentUserData(token).then(user => ({token, user}));


export const emailLogin = (email, password) => getToken(email, password)
  .then(getCurrentUserDataWithToken);

export const networkLogin = (token, network) => luch.post(withApiUrl('/enter'), {token, network, platform: 'web'})
  .then(getJson).then(data => getCurrentUserDataWithToken(data.token));
