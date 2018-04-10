/* eslint "fp/no-mutation": ["error", {"commonjs": true}] */

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const path = require('path');
// const fs = require('fs');


const isProduction = process.env.NODE_ENV === 'production';


const stylesIdentNames = isProduction ?
  '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]';


const joinToDirname = pth => path.join(__dirname, pth);
const jointToWebAppDir = pth => path.join('./src/', pth);


const baseConfig = {
  cache: true,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['react', 'env', 'stage-0'],
          plugins: ['lodash', 'transform-object-rest-spread'],
        }),
      },
      {
        test: /\.p?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            `css-loader?${JSON.stringify({
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: stylesIdentNames,
            })}`,
            'postcss-loader', // has separate config, see postcss.config.js nearby
          ],
        }),
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|.svg$/,
        loader: `file-loader?${JSON.stringify({name: 'assets/fonts/[name].[ext]'})}`,
      },
      {
        test: /\.png|\.jpe?g|\.gif$/,
        loader: `file-loader?${JSON.stringify({name: 'assets/images/[name].[ext]'})}`,
      },
    ],
  },

  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands: true,
    }),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true}),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

  stats: {
    children: false,
  },
};


// Client configs
const webClientConfig = {
  name: 'webClient',

  entry: {
    bundle: joinToDirname(jointToWebAppDir('/client/index.js')),
    vendor: ['react', 'react-dom', 'react-helmet', 'redux', 'react-redux',
      'redux-thunk', 'react-router', 'react-router-dom', 'luch'],
    loader: joinToDirname(jointToWebAppDir('/client/loader.js')),
    swRegister: joinToDirname(jointToWebAppDir('/client/swRegister.js')),
    sw: joinToDirname(jointToWebAppDir('/client/sw.js')),
  },
  output: {
    path: joinToDirname('/build/web'),
    filename: '[name].js',
  },

  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      // {from: joinToDirname(jointToWebAppDir('/client/index.html'))},
      {from: joinToDirname(jointToWebAppDir('/client/robots.txt'))},
      {from: joinToDirname(jointToWebAppDir('/client/manifest.json'))},
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['bundle'],
      minChunks: Infinity,
    }),
  ],

};
// end Client configs


// Node configs
const nodeConfig = Object.assign({}, baseConfig, {
  target: 'node',

  output: {
    path: joinToDirname('/build/web'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
});

const lambdaConfig = {
  name: 'lambda',
  entry: {
    lambda: joinToDirname(jointToWebAppDir('/server/lambda.js')),
  },

  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      {from: joinToDirname(jointToWebAppDir('/server/.env.yml'))},
      {from: joinToDirname(jointToWebAppDir('/server/serverless.yml'))},
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

const serverConfig = {
  name: 'server',
  entry: {
    server: joinToDirname(jointToWebAppDir('/server/server.js')),
  },

  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      {
        from: joinToDirname(jointToWebAppDir('/assets/images')),
        to: joinToDirname('/build/web/assets/images/'),
      },
    ]),
  ],
};
// end Node configs


const getFullConfig = commonConfig => envConfig => Object.assign({}, commonConfig, envConfig);
const getClientConfig = getFullConfig(baseConfig);
const getNodeConfig = getFullConfig(nodeConfig);

const builds = {
  webClient: getClientConfig(webClientConfig),
  server: getNodeConfig(serverConfig),
};

// lambda build breaks with -p flag
const lambdaBuild = getNodeConfig(lambdaConfig);


module.exports = process.env.build === 'lambda' ?
  lambdaBuild :
  process.env.build ?
    builds[process.env.build] :
    Object.keys(builds).map(k => builds[k]);
