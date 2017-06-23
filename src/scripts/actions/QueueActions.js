import {
  ADD_TO_QUEUE, ADD_TO_QUEUE_TOP, REMOVE_FROM_QUEUE
} from '../constants/ActionTypes';

import {addSongs} from './EntitiesAUDActions';
import {setCurrentSong} from './PlayerActions';

import v4 from 'uuid/v4';


export const add = references => ({
  type: ADD_TO_QUEUE,
  payload: references
});

export const addToTop = references => ({
  type: ADD_TO_QUEUE_TOP,
  payload: references
});

export const remove = id => ({
  type: REMOVE_FROM_QUEUE,
  payload: id
});


// entities
export const clone = item => ({...item, id: v4()});
export const reduceToObj = items => items.reduce((itms, item) => ({...itms, [item.id]: item}), {});


// songs
const dispatchSongs = action => songs => dispatch => {
  dispatch(addSongs(reduceToObj(songs)));
  return dispatch(action(songs.map(song => ({id: song.id, type: 'song'}))));
}

const dispatchClonedSongs = action => songs => dispatchSongs(action)(songs.map(clone))
export const addClonedSongs = dispatchClonedSongs(add);
export const addClonedSongsToTop = dispatchClonedSongs(addToTop);


export const addClonedSongsToTopAndPlay = songs => dispatch => {
  const sngs = songs.map(clone);
  dispatchSongs(addToTop)(sngs)(dispatch);
  return dispatch(setCurrentSong(sngs[0]));
};
export const addClonedSongToTopAndPlay = song => addClonedSongsToTopAndPlay([song]);
