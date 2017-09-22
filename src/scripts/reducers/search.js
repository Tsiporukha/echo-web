import {SET_SEARCH_TERM, ADD_TO_SEARCH_HISTORY} from '../constants/ActionTypes';
import {LATEST_SEARCH, POPULAR_SEARCH, LONGEST_SEARCH, YOUTUBE, SOUNDCLOUD, VIMEO} from '../constants/creatorsArgs';

import {combineReducers} from 'redux';
import {createSubFeedReducer, createVisibilityFilterReducer} from './reducerCreators';

const term = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_TERM: return action.payload;
    default: return state;
  }
};

const history = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_SEARCH_HISTORY: return [action.payload, ...state].filter((x, i, a) => a.indexOf(x) == i);
    default: return state;
  }
};

export default combineReducers({
  term,
  history,
  latest: createSubFeedReducer(LATEST_SEARCH, []),
  popular: createSubFeedReducer(POPULAR_SEARCH, []),
  longest: createSubFeedReducer(LONGEST_SEARCH, []),
  youtube: createSubFeedReducer(YOUTUBE, []),
  soundcloud: createSubFeedReducer(SOUNDCLOUD, []),
  vimeo: createSubFeedReducer(VIMEO, []),
});
