// require('babel-core/register');
// require('babel-polyfill');

require.extensions && ['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => (require.extensions[ext] = () => {}));

const app = require('./app').default;

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
