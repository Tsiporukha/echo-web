import {PLAY, PAUSE, SET_CURRENT_SONG, CLEAR_PLAYER} from '../constants/ActionTypes';

const initialState = {
  currentSong: {},
  playing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAY: return {...state, playing: true};
    case PAUSE: return {...state, playing: false};
    case SET_CURRENT_SONG: return {...state, currentSong: action.payload, playing: true};
    case CLEAR_PLAYER: return initialState;
    default: return state;
  }
};
