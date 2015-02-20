                    require('babel/register'); // Install `babel` hook
var express       = require('express');
var app           = express();
var path          = require('path');
var mongoose      = require('mongoose');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var fs            = require('fs');
var passport      = require('passport');

var settings        = require('./config/settings.js');
var secrets         = require('./config/secrets.js');
var passportConfig  = require('./config/passport');
var port            = process.env.PORT || settings.ports.server;


// ====================================================================== 
// Setup the database

mongoose.connect(secrets.mongoUrl);

// ====================================================================== 
// set up logging

app.use(morgan('dev')); // log every request to the console

// ====================================================================== 
// Server configuration. If using nginx you might want to let nginx handle these instead

// Enable cross-origin resource sharing (CORS)
var cors = require('cors');
app.use(cors());

// Enable compression
var compression = require('compression');
app.use(compression());

// ====================================================================== 
// Serve static assets in the public directory. In production serve assets in build as well

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production"){
  // In production serve a static directory for the webpack-compiled js and css.
  // In development the webpack dev server handles js and css
  app.use('/build', express.static(path.join(__dirname, '/build')));
}

// ====================================================================== 
// Parse Cookies, forms and urls

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// ====================================================================== 
// Use ejs for server side templates

app.set('view engine', 'ejs');

// ====================================================================== 
// Configure views and routes

app.set('views', __dirname + '/app/views');
var controllers = require('./app/routes.js')(app, passport); 

// ====================================================================== 
// Setup passport

passportConfig(passport, controllers);
app.use(session({ secret: secrets.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// ======================================================================
// Launch

app.listen(port);

if (process.env.NODE_ENV !== "production") {
  console.log('Listening on port ' + port);
}
