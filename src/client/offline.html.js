export default `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Echo</title>
    <style>
      body{
        font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #f8f8f8;
      }
      .root{
        flex-wrap: wrap;
        margin: 18% 0 0;
      }
      .status{
        font-size: 48px;
        color: #454545;
        text-align: center;
        margin: 0 0 12%;
        letter-spacing: 8px;
      }
      .message{
        text-align: center;
        font-size: 18px;
        color: #757575;
        letter-spacing: 1px;
      }

      @media (max-width: 650px) {
        .root{
          margin: 40% 0 0;
        }
      }
    </style>
  </head>

  <body>
    <div class='root'>
      <div class='status'>OFFLINE</div>
      <div class='message'>oh, you're offline</div>
    </div>
  </body>
</html>
`;
