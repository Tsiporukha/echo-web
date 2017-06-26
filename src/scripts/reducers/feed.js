import {combineReducers} from 'redux';
import {createSubFeedReducer, createVisibilityFilterReducer} from './reducerCreators';


export default combineReducers({
  visibilityFilter: createVisibilityFilterReducer('GLOBAL', 'latest'),
  global: createSubFeedReducer('GLOBAL', []),
  popular: createSubFeedReducer('POPULAR', [])
});
