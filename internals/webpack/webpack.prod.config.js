const webpack = require('webpack');
const config = require('./webpack.config');

config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);
config.devtool = 'eval';

module.exports = config;
