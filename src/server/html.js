export const renderHTML = ({meta = '', body = '', serializedState = ''}) => (`
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
      <link rel="stylesheet" href="/styles.css">
      <link rel="manifest" href="/manifest.json">
      <link rel="icon" type="image/png"
        href="https://s3.amazonaws.com/echoapp/assets/images/echo_logo_48.png">
    </head>
    <body>

      <noscript>
        Echo uses javascript, please enable it.
      </noscript>

      <div id="echoRoot">${body}</div>
      <script>
        window.__PRELOADED_STATE__ = ${serializedState}
      </script>

      <script src="/loader.js" charset="utf-8"></script>
      <script src="/vendor.js" charset="utf-8"></script>
      <script src="/bundle.js" charset="utf-8"></script>
      <script src="/swRegister.js" charset="utf-8" type="application/javascript"></script>
    </body>
  </html>
`);
