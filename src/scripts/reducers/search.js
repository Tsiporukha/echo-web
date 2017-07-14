import {SET_SEARCH_TERM} from '../constants/ActionTypes';
import {LATEST_SEARCH, POPULAR_SEARCH, LONGEST_SEARCH, YOUTUBE, SOUNDCLOUD} from '../constants/creatorsArgs';

import {combineReducers} from 'redux';
import {createSubFeedReducer, createVisibilityFilterReducer} from './reducerCreators';

const term = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_TERM: return action.payload;
    default: return state;
  }
};


export default combineReducers({
  term,
  latest: createSubFeedReducer(LATEST_SEARCH, []),
  popular: createSubFeedReducer(POPULAR_SEARCH, []),
  longest: createSubFeedReducer(LONGEST_SEARCH, []),
  youtube: createSubFeedReducer(YOUTUBE, []),
  soundcloud: createSubFeedReducer(SOUNDCLOUD, [])
});
