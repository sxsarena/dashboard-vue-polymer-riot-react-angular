const webpack = require('webpack');
const config = require('./webpack.config');

const HtmlPlugin = require('html-webpack-plugin');

config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  }),
  new HtmlPlugin()
]);
config.devtool = 'eval';

module.exports = config;
