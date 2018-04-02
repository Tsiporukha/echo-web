import {isProduction} from '../scripts/lib/base';


const clientDevServerUrl = 'http://localhost:9001';

const assetsUrl = isProduction ? '' : clientDevServerUrl;


export const getStreamMetaTags = (stream = {}, playlist = stream.playlist || {}) => (`
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


export const renderHTML = ({meta}) => (`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Echo music</title>

      <meta charset="utf-8">
      <meta name="theme-color" content="#2196F3">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="A social music streaming service that
        helps music fans share their music and the way the experience music
        socially effortlessly, in real-time;">
      ${meta}
      <link rel="stylesheet" href="${assetsUrl}/styles.css">
      <link rel="manifest" href="${assetsUrl}/manifest.json">
      <link rel="icon" type="image/png"
        href="https://s3.amazonaws.com/echoapp/assets/images/echo_logo_48.png">
    </head>
    <body>

      <noscript>
        Echo uses javascript, please enable it.
      </noscript>

      <div id="echoRoot"></div>

      <script src="${assetsUrl}/loader.js" charset="utf-8"></script>
      <script src="${assetsUrl}/vendor.js" charset="utf-8"></script>
      <script src="${assetsUrl}/bundle.js" charset="utf-8"></script>
      <script src="${assetsUrl}/swRegister.js" charset="utf-8"></script>
    </body>
  </html>
`);
