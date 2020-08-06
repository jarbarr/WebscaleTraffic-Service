var path = require('path');
var CLIENT_DIR = path.join(__dirname, '/client');
var PUBLIC_DIR = path.join(__dirname, '/public');

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
  }
};