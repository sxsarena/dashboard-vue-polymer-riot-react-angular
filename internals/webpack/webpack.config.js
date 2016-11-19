const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

const PATHS = {
  app: path.resolve(__dirname, '../../source/assets/'),
  build: path.resolve(__dirname, '../../public/')
};

module.exports = validate({
  entry: {
    vue:      path.join(PATHS.app, 'js', 'vue', 'index.js'),
    angular:  path.join(PATHS.app, 'js', 'angular', 'index.js'),
    react:    path.join(PATHS.app, 'js', 'react', 'index.js'),
    riot:     path.join(PATHS.app, 'js', 'riot', 'index.js'),
    polymer:  path.join(PATHS.app, 'js', 'polymer', 'index.js')
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].min.js',
    publicPath: ''
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
    extensions: ['', '.json', '.webpack.js', '.js', '.jsx']
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
          path.resolve(PATHS.app, "js/vue"),
          path.resolve(PATHS.app, "js/riot"),
          path.resolve(PATHS.app, "js/polymer")
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
          path.resolve(PATHS.app, "js/react")
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(PATHS.app, "js/angular")
        ],
        exclude: /(node_modules)/,
        loader: 'ng-annotate!babel-loader?presets[]=es2015,presets[]=stage-0'
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loaders: ['json-loader'] },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /src/,
        loaders: ['style', 'css']
      }
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
