import express from 'express';
import cookieParser from 'cookie-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {Helmet} from 'react-helmet';

import {configureServerStore, getSessionState} from '../scripts/store/configureStore';
import {renderHTML} from './html';

import routes from '../scripts/routes';


/* eslint-disable fp/no-unused-expression */
const app = express();


app.use(cookieParser());

const staticFilesPath = './'; // isProduction ? './' : path.join(__dirname, '../');
app.use(express.static(staticFilesPath));


app.use((req, res) => {
  const {token} = req.cookies;
  const store = configureServerStore(getSessionState(token));

  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({route}) => {
    const {fetchData} = route;
    return fetchData instanceof Function ?
      fetchData(store, {url: req.url, token}) : Promise.resolve(false);
  });

  return Promise.all(promises).then(_ => {
    const context = {};
    const body = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    const serializedState = JSON.stringify(store.getState());

    return res.send(renderHTML({body, serializedState, meta: helmet.meta.toString()}));
  });
});

export default app;
