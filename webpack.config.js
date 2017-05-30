const path = require('path');

const SRC_DIR = path.join(__dirname, './client/src');
const BUILD_DIR = path.join(__dirname, 'static');

module.exports = {
  entry: `${SRC_DIR}/Index.js`,
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] }
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

