var webpackDevServer  = require('webpack-dev-server');
var webpack           = require('webpack');
var webpackConfig     = require('./config/webpack.config.js')(false);
var settings          = require('./config/settings.js');

console.log('Starting Webpack hot load server');

new webpackDevServer(webpack(webpackConfig), {
  //contentBase: 'http://localhost:' + settings.ports.hotPort,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  noInfo: true,
  headers: { "Access-Control-Allow-Origin": "*" }
}).listen(settings.ports.hotPort, 'localhost', function(err, result){
  if(err){
    throw new gutil.PluginError('webpack-dev-server', err);
  }
  console.log('Webpack hot load server listening on port ' + settings.ports.hotPort);
});