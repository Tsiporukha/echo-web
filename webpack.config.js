/* eslint "fp/no-mutation": ["error", {"commonjs": true}] */

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nmPath = './node_modules';

const joinToDirname = pth => path.join(__dirname, pth);
const jointToWebAppDir = pth => path.join('./src/', pth);

const getFullConfig = envConfig => Object.assign({}, commonConfig, envConfig);

const commonConfig = {
  cache: true,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-object-rest-spread']
        })
      },
      {
        test: /\.p?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see wp.postcss.config.js nearby
        ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|.svg$/,
        loader: 'file-loader?' + JSON.stringify({name: 'assets/fonts/[name].[ext]'})
      },
      {
        test: /\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader?' + JSON.stringify({name: 'assets/images/[name].[ext]'})
      }
    ]
  },

  stats: {
    children: false
  }
}

const webAppConfig = {
  name: 'web',

  entry: {
    bundle: joinToDirname(jointToWebAppDir('/index.js'))
  },
  output: {
    path: joinToDirname('/build/web'),
    filename: '[name].js'
  },

  plugins: [
    new CopyWebpackPlugin([{from: joinToDirname(jointToWebAppDir('/index.html'))}
    ]),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
  ],
}

const builds = {web: getFullConfig(webAppConfig)};

module.exports = process.env.build ? builds[process.env.build] : Object.keys(builds).map(k => builds[k]);
