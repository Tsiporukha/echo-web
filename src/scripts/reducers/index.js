import {combineReducers} from 'redux';

import {createNamedAUDReducer} from './reducerCreators';
import feed from './feed';

export default combineReducers({
  users: createNamedAUDReducer('USER'),
  streams: createNamedAUDReducer('STREAM'),
  playlists: createNamedAUDReducer('PLAYLIST'),
  songs: createNamedAUDReducer('SONG'),

  feedSources: combineReducers({
    feed
  })
});
