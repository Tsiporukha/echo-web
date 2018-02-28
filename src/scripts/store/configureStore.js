import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';

import {loadState, saveState} from './localStorage';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(rootReducer, loadState(), composeEnhancers(
    applyMiddleware(thunkMiddleware))); // a normal Redux store

  store.subscribe(throttle(() => saveState({
    session: store.getState().session,
    search: {history: store.getState().search.history},
  }), 1000));

  return store;
};

export default configureStore;
