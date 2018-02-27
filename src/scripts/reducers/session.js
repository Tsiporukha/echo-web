import {SET_TOKEN, SET_USER_DATA, SET_SESSION, CLEAR_SESSION} from '../constants/ActionTypes';

/* eslint-disable fp/no-nil */
export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN: return {...state, token: action.payload};
    case SET_USER_DATA: return {...state, user: action.payload};
    case SET_SESSION: return action.payload;
    case CLEAR_SESSION: return {};
    default: return state;
  }
};
