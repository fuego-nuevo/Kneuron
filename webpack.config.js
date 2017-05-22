const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

const SRC_DIR = path.resolve(__dirname, './client/src');
const BUILD_DIR = path.resolve(__dirname, './static');

module.exports = {

  entry: {
<<<<<<< HEAD
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      `${SRC_DIR}/index.js`,
    ],
=======
    'app': [
      './client/src/index'
    ]
>>>>>>> e562a806bb265b1ad0ea94ff90aa68a31c58f7c4
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/static',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader?cacheDirectory',
        include: SRC_DIR,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
<<<<<<< HEAD
=======
          presets: ['es2015', 'react'],
        },
      },
    ],
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
>>>>>>> e562a806bb265b1ad0ea94ff90aa68a31c58f7c4
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
