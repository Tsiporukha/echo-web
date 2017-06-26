import {createAUDConsts, createSubFeedConsts} from './actionTypesCreators';


export const {ADD_STREAMS, UPDATE_STREAMS, DELETE_STREAMS} = createAUDConsts('STREAM');
export const {ADD_USERS, UPDATE_USERS, DELETE_USERS} = createAUDConsts('USER');
export const {ADD_PLAYLISTS, UPDATE_PLAYLISTS, DELETE_PLAYLISTS} = createAUDConsts('PLAYLIST');
export const {ADD_SONGS, UPDATE_SONGS, DELETE_SONGS} = createAUDConsts('SONG');

export const {SET_GLOBAL, ADD_TO_GLOBAL, DELETE_FROM_GLOBAL} = createSubFeedConsts('GLOBAL');
export const {SET_POPULAR, ADD_TO_POPULAR, DELETE_FROM_POPULAR} = createSubFeedConsts('POPULAR');

export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const ADD_TO_QUEUE_TOP = 'ADD_TO_QUEUE_TOP';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
