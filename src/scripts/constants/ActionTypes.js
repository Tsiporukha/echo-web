import {createAUDConsts, createSubFeedConsts} from './actionTypesCreators';
import {
  STREAM, USER, PLAYLIST, SONG,
  LATEST, POPULAR, LONGEST
} from './creatorsArgs';

export const {ADD_USERS, UPDATE_USERS, DELETE_USERS} = createAUDConsts(USER);
export const {ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS} = createAUDConsts(STREAM);
export const {ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS} = createAUDConsts(PLAYLIST);
export const {ADD_SONGS, UPDATE_SONGS, DELETE_SONGS} = createAUDConsts(SONG);

export const {SET_LATEST, ADD_TO_LATEST, REMOVE_FROM_LATEST} = createSubFeedConsts(LATEST);
export const {SET_POPULAR, ADD_TO_POPULAR, REMOVE_FROM_POPULAR} = createSubFeedConsts(POPULAR);
export const {SET_LONGEST, ADD_TO_LONGEST, REMOVE_FROM_LONGEST} = createSubFeedConsts(LONGEST);

export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const ADD_TO_QUEUE_TOP = 'ADD_TO_QUEUE_TOP';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';


export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const CLEAN_PLAYER = 'CLEAN_PLAYER';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
