const webpack = require('webpack');
const config = require('./webpack.config');

config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin()
]);
config.devtool = 'eval-source-map';

module.exports = config;
