import {
  ADD_TO_QUEUE, ADD_TO_QUEUE_TOP, REMOVE_FROM_QUEUE
} from '../constants/ActionTypes';

import {addSongs} from './EntitiesAUDActions';

import v4 from 'uuid/v4';


export const add = ids => ({
  type: ADD_TO_QUEUE,
  payload: ids
});

export const addToTop = ids => ({
  type: ADD_TO_QUEUE_TOP,
  payload: ids
});

export const remove = id => ({
  type: REMOVE_FROM_QUEUE,
  payload: id
});


const clone = item => ({...item, id: v4()});
const cloneSongsAndDispatch = action => songs => dispatch => {
  const sngs = songs.map(clone);
  dispatch(addSongs(sngs.reduce((sngsObj, song) => ({...sngsObj, [song.id]: song}), {}) ));
  return dispatch(action(sngs.map(song => ({id: song.id, type: 'song'}))));
}


export const cloneSongsAndAdd = cloneSongsAndDispatch(add);
export const cloneSongsAndAddToTop = cloneSongsAndDispatch(addToTop);
