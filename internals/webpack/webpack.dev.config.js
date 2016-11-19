const webpack = require('webpack');
const config = require('./webpack.config');

const HtmlPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new DashboardPlugin(),
  new HtmlPlugin()
]);
config.devtool = 'source-map';

module.exports = config;
