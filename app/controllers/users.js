var User            = require("../models/user");
var StrategyCommon  = require("./strategies/strategy_common");
module.exports = function(app, passport){

  return {
    
    create: function(req, res, next){
      StrategyCommon.finishAuth('local-signup', passport, req, res, next);
    },

    // Called by passport when a user signs up
    strategyCallback: function(req, email, password, done){
      if(email){
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
      }

      // asynchronous
      process.nextTick(function(){
        // if the user is not already logged in:
        if(!req.user){

          User.find({ 'email' : email }, function(err, user){
            if(err){ return done(err); }
            
            // Check for existing email
            if(user){
              return done(null, false, { 'message' : 'That email is already taken.' });
            } else {
              // create the user
              var user      = new User();
              user.email    = email;
              user.password = user.generateHash(password);
              user.save(function(err){
                if(err){
                  return done(err);
                }
                return done(null, user);
              });
            }

          });
        } else if(!req.user.email){
          // The user is logged in but has no local account.
          // Presumably they're trying to connect a local account
          // Check if the email used to connect a local account is being used by another user
          User.findOne({ 'email' :  email }, function(err, user){
            if(err){ return done(err); }

            if(user){
              return done(null, false, { 'loginMessage' : 'That email is already taken.' });
              // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
            } else {
              var user = req.user;
              user.email = email;
              user.password = user.generateHash(password);
              user.save(function (err){
                if(err){ return done(err); }
                return done(null,user);
              });
            }
          });
        } else {
          // User is logged in and already has a local account. Ignore signup.
          return done(null, req.user);
        }

      });
    }

  };
  
}