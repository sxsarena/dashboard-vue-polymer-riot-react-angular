const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./internals/webpack/webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: 'public/',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening on http://localhost:3000');
});
