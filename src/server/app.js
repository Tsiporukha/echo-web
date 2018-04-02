/* eslint "fp/no-unused-expression": 0 */
import express from 'express';
import path from 'path';

import {renderHTML, getStreamMetaTags} from './html';

import {isProduction} from '../scripts/lib/base';
import {getStream} from '../scripts/lib/ebApi/streams';


const maybeGetStream = splittedUrl => splittedUrl[1] === 'feed' ?
  getStream(Number(splittedUrl[2])) : Promise.resolve({});


const app = express();


const staticFilesPath = isProduction ? './' : path.join(__dirname, '../');
app.use(express.static(staticFilesPath));


app.use((req, res) => {
  res.set('Content-Type', 'text/html');
  return maybeGetStream(req.url.split('/'))
    .then(maybeStream => res.end(renderHTML({meta: getStreamMetaTags(maybeStream)})));
});


export default app;
