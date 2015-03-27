var fs            = require('fs');
var path          = require('path');

module.exports = function(app, passport){

	// ======================================================================
	// Method to ensure user is logged in
	function isAuthenticated(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		return res.status(422).json({"message" : "Not authorized"});
	}

	// ======================================================================
	// Load Controllers
	function loadControllers(dir){
	  var controllers = {};
	  fs.readdirSync(dir).forEach(function(file){
	    if(file.substr(-3) == '.js'){
	      var name = file.replace('.js', '');
	      console.log('Loading controller ' + name);
	      controllers[name] = require(dir + file)(app, passport);
	    }
	  });
	  return controllers;
	}

	var controllers = loadControllers(path.join(__dirname, './controllers/'));
	controllers.strategies = loadControllers(path.join(__dirname, './controllers/strategies/'));

	// ======================================================================
	//
	// Routes
	//

	// Home
	app.get('/', controllers.index.index);

	// Login
	app.post('/sessions', controllers.strategies.local.create);
	app.get('/logout', controllers.strategies.local.destroy);
	app.delete('/sessions', controllers.strategies.local.destroy);

  app.post('/connect/local', controllers.strategies.local.create);
  app.get('/unlink/local', isAuthenticated, controllers.strategies.local.unlink);
  app.delete('/unlink/local', isAuthenticated, controllers.strategies.local.unlink);

  // Sign up
  app.post('/users', controllers.users.create);

	// Facebook
	app.get('/auth/facebook', controllers.strategies.facebook.start);
	app.get('/auth/facebook/callback', controllers.strategies.facebook.callback);
	app.get('/connect/facebook', controllers.strategies.facebook.start);
	app.get('/connect/facebook/callback', controllers.strategies.facebook.callback);
	app.get('/unlink/facebook', isAuthenticated, controllers.strategies.facebook.unlink);

	// Twitter
	app.get('/auth/twitter', controllers.strategies.twitter.start);
	app.get('/auth/twitter/callback', controllers.strategies.twitter.callback);
	app.get('/connect/twitter', controllers.strategies.twitter.start);
	app.get('/connect/twitter/callback', controllers.strategies.twitter.callback);
	app.get('/unlink/twitter', isAuthenticated, controllers.strategies.twitter.unlink);

	// Google
	app.get('/auth/google', controllers.strategies.google.start);
	app.get('/auth/google/callback', controllers.strategies.google.callback);
	app.get('/connect/google', controllers.strategies.google.start);
	app.get('/connect/google/callback', controllers.strategies.google.callback);
	app.get('/unlink/google', isAuthenticated, controllers.strategies.google.unlink);

	return controllers;
};