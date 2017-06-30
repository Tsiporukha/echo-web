import {LATEST, POPULAR, LONGEST} from '../constants/creatorsArgs';

import {combineReducers} from 'redux';
import {createSubFeedReducer, createVisibilityFilterReducer} from './reducerCreators';


export default combineReducers({
  visibilityFilter: createVisibilityFilterReducer('GLOBAL', 'latest'),
  latest: createSubFeedReducer(LATEST, []),
  popular: createSubFeedReducer(POPULAR, []),
  longest: createSubFeedReducer(LONGEST, [])
});
