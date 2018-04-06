import 'babel-polyfill';

import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';

import routes from '../scripts/routes';

import {configureClientStore} from '../scripts/store/configureStore';

export const store = configureClientStore();


/* eslint-disable fp/no-unused-expression */
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('echoRoot')
);
