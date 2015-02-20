module.exports = function(app, passport){
  return {

    // Send the user to Facebook to be authenticated
    start: function(req, res){
      passport.authenticate('facebook', { scope: 'email' })(req, res);
    },

    // Handle the callback after Facebook has authenticated the user
    callback: function(req, res){
      var callback = passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
      });
      callback(req, res);
    },

    unlink: function(req, res){
      var user = req.user;
      user.facebook.token = undefined;
      user.save(function(err){
        res.redirect('/');
      });
    },

    // Called by passport when the call to Facebook returns
    strategyCallback: function(req, token, refreshToken, profile, done){
      // asynchronous
      process.nextTick(function(){
        // check if the user is already logged in
        if(!req.user){
          User.findOne({
            'facebook.id': profile.id
          }, function(err, user){
            if(err){
              return done(err);
            }
            if(user){
              if(!user.facebook.token){
                // There is a user id already but no token (user was linked at one point and then removed)
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                user.save(function(err){
                  if(err){
                    return done(err);
                  }
                  return done(null, user);
                });
              }
              return done(null, user); // user found, return that user
            } else {
              // if there is no user, create them
              var user = new User();
              user.facebook.id = profile.id;
              user.facebook.token = token;
              user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.email = (profile.emails[0].value || '').toLowerCase();
              user.save(function(err){
                if(err){
                  return done(err);
                }
                return done(null, user);
              });
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session
          user.facebook.id = profile.id;
          user.facebook.token = token;
          user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          user.facebook.email = (profile.emails[0].value || '').toLowerCase();
          user.save(function(err){
            if(err){
              return done(err);
            }
            return done(null, user);
          });
        }
      });
    }

  };
}
