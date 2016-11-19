const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

const PATHS = {
  app: path.resolve(__dirname, '../../source/assets/js'),
  build: path.resolve(__dirname, '../../public/js/')
};

module.exports = validate({
  entry: {
    vue: path.resolve(PATHS.app, 'vue/index.js'),
    angular: path.resolve(PATHS.app, 'angular/index.js'),
    react: path.resolve(PATHS.app, 'react/index.js'),
    riot: path.resolve(PATHS.app, 'riot/index.js'),
    polymer: path.resolve(PATHS.app, 'polymer/index.js')
  },
  output: {
    path: PATHS.build,
    filename: '[name].min.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    root: path.join(__dirname, '../../'),
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.webpack.js', '.js', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riotjs-loader',
        query: { type: 'none' }
      },
      {
        test: /\/components\/.+\.js$/,
        loader: 'polymer-loader?templateExtension=html&styleExtension=scss'
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "../../source/assets/js/vue"),
          path.resolve(__dirname, "../../source/assets/js/riot"),
          path.resolve(__dirname, "../../source/assets/js/polymer")
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.jsx$/,
        include: [
          path.resolve(__dirname, "../../source/assets/js/react")
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "../../source/assets/js/angular")
        ],
        exclude: /(node_modules)/,
        loader: 'ng-annotate!babel-loader?presets[]=es2015,presets[]=stage-0'
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loaders: ['json-loader'] }
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: 'eval',
  target: 'web',
  plugins: []
});
