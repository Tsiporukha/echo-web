import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';

import {loadState, saveState} from './localStorage';
import rootReducer from '../reducers';

import {getEntities as getQueueEntities} from '../actions/QueueActions';

const composeEnhancers = (
  typeof window === 'undefined' || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;


export const getSessionState = token => token ? {session: {token}} : {};

export const configureServerStore = initialData => createStore(
  rootReducer,
  initialData,
  compose(applyMiddleware(thunkMiddleware))
);


/* eslint-disable fp/no-mutation, no-return-assign */
const maybeAddCookieToken = token => {
  const date = new Date();
  date.setMonth(date.getMonth() + 2);
  return document.cookie = token ?
    `token=${token}; path=/; expires=${date}; ` :
    `token=; path=/; expires=${new Date(0)}; `;
};

/* eslint-enable fp/no-mutation, no-return-assign */

export const configureClientStore = () => {
  const localState = {search: {}, queue: {}, ...loadState()};

  const mergeStates = key =>
    ({[key]: {...localState[key], ...window.__PRELOADED_STATE__[key]}});

  const store = createStore(
    rootReducer,
    {
      ...localState,
      ...window.__PRELOADED_STATE__,

      search: {history: localState.search.history},

      queue: localState.queue,
      ...mergeStates('streams'),
      ...mergeStates('playlists'),
      ...mergeStates('songs'),
      ...mergeStates('users'),
    },
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  /* eslint-disable fp/no-unused-expression */
  store.subscribe(throttle(
    () => {
      maybeAddCookieToken(store.getState().session.token);

      return saveState({
        session: store.getState().session,

        search: {history: store.getState().search.history},

        queue: store.getState().queue,
        ...getQueueEntities(store.getState()),
      });
    },
    1000
  ));

  return store;
};
