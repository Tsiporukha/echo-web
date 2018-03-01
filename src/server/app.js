/* eslint "fp/no-unused-expression": 0 */

import express from 'express';
import path from 'path';

import {isProduction} from '../scripts/lib/base';
import {getStream} from '../scripts/lib/ebApi/streams';

const clientDevServerUrl = 'http://localhost:9001';

const assetsUrl = isProduction ? '' : clientDevServerUrl;


const createStreamMetaTags = (stream = {}, playlist = stream.playlist || {}) => (`
  <meta property='og:type' content='website' />
  <meta property='og:site_name' content='Echo' />
  <meta property='og:title' content='${playlist.title}' />
  <meta property='og:description' content='${playlist.description}' />
  <meta property='og:url' content='echoapplication.com/feed/${stream.id}' />
  <meta property='og:image' content='${stream.artwork_url}' />
  <meta property='og:image:width' content='968' />
  <meta property='og:image:height' content='504' />
  <meta name='twitter:card' content='summary_large_image' />
  <meta name='twitter:title' content='${playlist.title}' />
  <meta name='twitter:description' content='${playlist.description}' />
  <meta name='twitter:image:src' content='${stream.artwork_url}' />
  <meta name='twitter:url' content='echoapplication.com/feed/${stream.id}' />
  <meta name='twitter:domain' content='echoapplication.com' />
  <meta name='twitter:site' content='@' />
  <meta name='twitter:creator' content='@...' />
`);


const renderHTML = metaTags => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${metaTags}
      <title>Echo</title>
      <link rel="stylesheet" href="${assetsUrl}/styles.css">
    </head>
    <body>
      <div id="echoRoot"></div>

      <script src="${assetsUrl}/loader.js" charset="utf-8"></script>
      <script src="${assetsUrl}/bundle.js" charset="utf-8"></script>
    </body>
  </html>
`);


const getStreamIfMatch = splittedUrl => splittedUrl[1] === 'feed' ? getStream(Number(splittedUrl[2])) : Promise.resolve({});


const app = express();


const staticFilesPath = isProduction ? './' : path.join(__dirname, '../');
app.use(express.static(staticFilesPath));


app.use((req, res) => {
  res.set('Content-Type', 'text/html');
  return getStreamIfMatch(req.url.split('/')).then(maybeStream => res.end(renderHTML(createStreamMetaTags(maybeStream))));
});


export default app;
