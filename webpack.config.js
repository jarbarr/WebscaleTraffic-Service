const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

const CLIENT_DIR = path.join(__dirname, '/client');
const PUBLIC_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${CLIENT_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: PUBLIC_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include : CLIENT_DIR,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ]
};