var React         = require('react');
var Router        = require('react-router');
var UAParser      = require('ua-parser-js');

var RouteHandler  = Router.RouteHandler;

var settings      = require('../../config/settings.js');
var routes        = require('../../client/js/routes.jsx');

function deviceType(req){
  // In order to handle "media queries" server-side (preventing FOUT), we parse the user agent string,
  // and pass a string down through the router that lets components style and render themselves
  // For the correct viewport. Client.js uses window width, which resolves any problems with
  // browser sniffing.
  var parser = new UAParser();
  var ua = parser.setUA(req.headers['user-agent']).getResult();
  if (ua.device.type === undefined) {
    return "desktop";
  } else {
    return ua.device.type;
  }
}

module.exports = function(app){

  return {

    index: function(req, res){
      var content = "";

      // Customize the onAbort method in order to handle redirects
      var router = Router.create({
        routes: routes,
        location: req.path,
        onAbort: function defaultAbortHandler(abortReason, location) {
          if (abortReason && abortReason.to) {
            res.redirect(301, abortReason.to);
          } else {
            res.redirect(404, "404");
          }
        }
      });

      // Run the router, and render the result to string
      router.run(function(Handler, state){
        content = React.renderToString(React.createElement(Handler, {
          routerState: state, 
          deviceType: deviceType, 
          environment: "server"
        }), null);
      });

      var scriptPath = 'http://localhost:' + settings.ports.hotPort + settings.devRelativeOutput + '/app.js';
      var cssPath = 'http://localhost:' + settings.ports.hotPort + settings.devRelativeOutput + '/styles.css';
      if(process.env.NODE_ENV === "production"){
        scriptPath = '/app.js';
        cssPath = '/styles.css'
      }

      res.render('index.ejs', {
        content: content, 
        scriptPath: scriptPath,
        cssPath: cssPath
      });
    }

  };
  
}