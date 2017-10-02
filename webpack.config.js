/* eslint "fp/no-mutation": ["error", {"commonjs": true}] */

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const fs = require('fs');


const joinToDirname = pth => path.join(__dirname, pth);
const jointToWebAppDir = pth => path.join('./src/', pth);


/// Client configs
const clientConfig = {
  cache: true,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-object-rest-spread']
        })
      },
      {
        test: /\.p?css$/,
        use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use:[
          'css-loader?' + JSON.stringify({modules: true, sourceMap: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]'}),
          'postcss-loader' // has separate config, see postcss.config.js nearby
          ]
        })
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

const webClientConfig = {
  name: 'webClient',

  entry: {
    bundle: joinToDirname(jointToWebAppDir('/client/index.js')),
    loader: joinToDirname(jointToWebAppDir('/client/loader.js')),
  },
  output: {
    path: joinToDirname('/build/web'),
    filename: '[name].js'
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: joinToDirname(jointToWebAppDir('/client/index.html'))},
    ]),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true}),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

}
// end Client configs


/// Node configs
const nodeConfig = {
  target: 'node',
  cache: true,

//  externals: fs.readdirSync('node_modules').reduce((acc, mod) => mod === '.bin' ? acc : Object.assign(acc, {[mod]: `commonjs ${mod}`}), {}),

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-object-rest-spread']
        }),
      }
    ]
  },

  output: {
    path: joinToDirname('/build/web'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },

};

const lambdaConfig = {
  name: 'lambda',
  entry: {
    lambda: joinToDirname(jointToWebAppDir('/server/lambda.js')),
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: joinToDirname(jointToWebAppDir('/server/.env.yml'))},
      {from: joinToDirname(jointToWebAppDir('/server/serverless.yml'))},
    ]),
  ],
};

const serverConfig = {
  name: 'server',
  entry: {
    server: joinToDirname(jointToWebAppDir('/server/server.js')),
  },
};
// end Node configs


const getFullConfig = commonConfig => envConfig => Object.assign({}, commonConfig, envConfig);
const getClientConfig = getFullConfig(clientConfig);
const getNodeConfig = getFullConfig(nodeConfig)

const builds = {webClient: getClientConfig(webClientConfig), server: getNodeConfig(serverConfig), lambda: getNodeConfig(lambdaConfig)};


module.exports = process.env.build ? builds[process.env.build] : Object.keys(builds).map(k => builds[k]);
