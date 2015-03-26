var StrategyCommon  = require("../../utils/strategy_common");

module.exports = function (app, passport){
  return {

    // Send the user to Twitter to be authenticated
    start: function (req, res, next){
      passport.authenticate('twitter', { scope: 'email' })(req, res, next);
    },

    // Handle the callback after Twitter has authenticated the user
    callback: function (req, res, next){
      StrategyCommon.finishAuth('twitter', passport, req, res, next);
    },

    unlink: function (req, res){
      var user = req.user;
      user.twitter.token = undefined;
      user.save(function (err){
        res.json({"user": {}});
      });
    },

    // Called by passport when the call to Twitter returns
    strategyCallback: function (req, token, tokenSecret, profile, done){
      // asynchronous
      process.nextTick(function (){
        // check if the user is already logged in
        if (!req.user){
          User.findOne({
            'twitter.id': profile.id
          }, function (err, user){
            if (err) return done(err);
            if (user){
              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.twitter.token){
                user.twitter.token = token;
                user.twitter.username = profile.username;
                user.twitter.displayName = profile.displayName;
                user.save(function (err){
                  if (err) return done(err);
                  return done(null, user);
                });
              }
              return done(null, user); // user found, return that user
            } else {
              // if there is no user, create them
              var newUser = new User();
              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.username = profile.username;
              newUser.twitter.displayName = profile.displayName;
              newUser.save(function (err){
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session
          user.twitter.id = profile.id;
          user.twitter.token = token;
          user.twitter.username = profile.username;
          user.twitter.displayName = profile.displayName;
          user.save(function (err){
            if (err) return done(err);
            return done(null, user);
          });
        }
      });
    }

  };
}
