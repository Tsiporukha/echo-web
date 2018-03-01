/* eslint "fp/no-mutation": ["error", {"commonjs": true}] */

// require('babel-core/register');
// require('babel-polyfill');
//
require.extensions && ['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach(ext => (require.extensions[ext] = () => {}));


const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app').default;

const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
