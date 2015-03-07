var StrategyCommon  = require("../../utils/strategy_common");

module.exports = function(app, passport) {
  return {
    
    // Send the user to Google to be authenticated
    start: function(req, res) {
      passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
    },

    // Handle the callback after Google has authenticated the user
    callback: function(req, res, next) {
      StrategyCommon.finishAuth('local-signup', passport, req, res, next);
    },
    
    unlink: function(req, res) {
      var user = req.user;
      user.google.token = undefined;
      user.save(function(err) {
        res.json({"user": {}});
      });
    },
    
    // Called by passport when the call to Google returns
    strategyCallback: function(req, email, password, done) {
      // asynchronous
      process.nextTick(function() {
        // check if the user is already logged in
        if(!req.user) {
          User.findOne({
            'google.id': profile.id
          }, function(err, user) {
            if(err) return done(err);
            if(user) {
              // if there is a user id already but no token (user was linked at one point and then removed)
              if(!user.google.token) {
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                user.save(function(err) {
                  if(err) return done(err);
                  return done(null, user);
                });
              }
              return done(null, user);
            } else {
              var newUser = new User();
              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.google.name = profile.displayName;
              newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
              newUser.save(function(err) {
                if(err) return done(err);
                return done(null, newUser);
              });
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session
          user.google.id = profile.id;
          user.google.token = token;
          user.google.name = profile.displayName;
          user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
          user.save(function(err) {
            if(err) return done(err);
            return done(null, user);
          });
        }
      });
    }

  };
}
