import {combineReducers} from 'redux';

import {createNamedAUDReducer} from './reducerCreators';
import feed from './feed';
import queue from './queue';

export default combineReducers({
  users: createNamedAUDReducer('USER'),
  streams: createNamedAUDReducer('STREAM'),
  playlists: createNamedAUDReducer('PLAYLIST'),
  songs: createNamedAUDReducer('SONG'),

  feedSources: combineReducers({
    feed
  }),

  queue
  
});
