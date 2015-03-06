var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var User       = require('../app/models/user');
var secrets    = require('./secrets'); // use this one for testing

module.exports = function(passport, controllers) {

  // =========================================================================
  // Passport session setup - serialize and unserialize users out of session

  // Serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

  // =========================================================================
  // Local login
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',    // use email instead of username
    passwordField : 'password',
    passReqToCallback : true   
  }, controllers.strategies.local.strategyCallback));

  // =========================================================================
  // Local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',    // use email instead of username
    passwordField : 'password',
    passReqToCallback : true
  }, controllers.users.strategyCallback));
  
  // =========================================================================
  // Facebook
  passport.use(new FacebookStrategy({
    clientID        : secrets.facebookAuth.clientID,
    clientSecret    : secrets.facebookAuth.clientSecret,
    callbackURL     : secrets.facebookAuth.callbackURL,
    passReqToCallback : true
  }, controllers.strategies.facebook.strategyCallback));

  // =========================================================================
  // Twitter
  passport.use(new TwitterStrategy({
    consumerKey     : secrets.twitterAuth.consumerKey,
    consumerSecret  : secrets.twitterAuth.consumerSecret,
    callbackURL     : secrets.twitterAuth.callbackURL,
    passReqToCallback : true
  }, controllers.strategies.twitter.strategyCallback));

  // =========================================================================
  // Google
  passport.use(new GoogleStrategy({
    clientID        : secrets.googleAuth.clientID,
    clientSecret    : secrets.googleAuth.clientSecret,
    callbackURL     : secrets.googleAuth.callbackURL,
    passReqToCallback : true
  }, controllers.strategies.google.strategyCallback));

};
