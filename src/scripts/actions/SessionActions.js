import {SET_TOKEN, SET_USER_DATA, SET_SESSION, CLEAR_SESSION} from "../constants/ActionTypes";

import {addUsers} from './EntitiesAUDActions';
import {createIdKeyHash} from '../lib/base';

import {emailLogin as emlLogin, networkLogin as ntwrkLogin, getCurrentUserData} from '../lib/ebApi/session';


export const setToken = token => ({
  type: SET_USER_DATA,
  payload: token
});

export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: userData
});

export const setSession = sessionData => ({
  type: SET_SESSION,
  payload: sessionData
});

export const clearSession = token => ({type: CLEAR_SESSION});


const handleLogin = dispatch => sessionData =>
  Promise.resolve(dispatch(setSession(sessionData))).then(_ => dispatch(addUsers(createIdKeyHash(sessionData.user))));

export const emailLogin = (email, password) => dispatch => emlLogin(email, password).then(handleLogin(dispatch));
export const networkLogin = (token, network) => dispatch => ntwrkLogin(token, network).then(handleLogin(dispatch));

export const updateCurrentUserData = token => dispatch => getCurrentUserData(token).then(userData => dispatch(setUserData(userData)))
  .catch(_ => dispatch(clearSession()));
