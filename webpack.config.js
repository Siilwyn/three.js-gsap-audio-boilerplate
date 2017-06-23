const path = require('path');

const config = {
  // Input
  entry: './src/main.js',

  // Output
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Transformations
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },

  // Source maps
  devtool: 'source-map',

  // Server
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
  },
};
module.exports = config;
