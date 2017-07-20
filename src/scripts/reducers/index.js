import {combineReducers} from 'redux';

import {createNamedAUDReducer} from './reducerCreators';
import feed from './feed';
import search from './search';
import queue from './queue';
import player from './player';
import session from './session';

export default combineReducers({
  users: createNamedAUDReducer('USER'),
  streams: createNamedAUDReducer('STREAM'),
  playlists: createNamedAUDReducer('PLAYLIST'),
  songs: createNamedAUDReducer('SONG'),

  feedSources: combineReducers({
    feed
  }),

  search,

  queue,

  player,

  session

});
