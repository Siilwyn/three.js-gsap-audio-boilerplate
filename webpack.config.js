const path = require('path');

const config = {
  mode: process.env.NODE_ENV || 'production',

  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
  },
};

module.exports = config;
