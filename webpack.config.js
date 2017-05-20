const webpack = require('webpack');
const path = require('path');
require('dotenv').config()


const SRC_DIR = path.resolve(__dirname, './client/src');
const BUILD_DIR = path.resolve(__dirname, './static');

module.exports = {
  
  entry: {
    app: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        `${SRC_DIR}/index.js`, 
      ],
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/static'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: SRC_DIR,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: [
            'react-hot-loader/babel',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
