import {combineReducers} from 'redux';
import {createSubFeedReducer, createVisibilityFilterReducer} from './reducerCreators';


const initialSubFeedState = {
  filters: {
    offset: 0,
    limit: 5,
    fetchedAll: false
  },
  items: []
}

export default combineReducers({
  visibilityFilter: createVisibilityFilterReducer('GLOBAL', 'latest'),
  global: createSubFeedReducer('GLOBAL', initialSubFeedState),
  popular: createSubFeedReducer('POPULAR', initialSubFeedState)
});
