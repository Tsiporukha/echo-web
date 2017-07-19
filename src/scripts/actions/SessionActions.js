import {SET_TOKEN, SET_USER_DATA, SET_SESSION, CLEAR_SESSION} from "../constants/ActionTypes";

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


export const emailLogin = (email, password) => dispatch => emlLogin(email, password).then(sessionData => dispatch(setSession(sessionData)));
export const networkLogin = (token, network) => dispatch => ntwrkLogin(token, network).then(sessionData => dispatch(setSession(sessionData)));

export const updateCurrentUserData = token => dispatch => getCurrentUserData(token).then(userData => dispatch(setUserData(userData)));
