module.exports = function(app, passport){

  return {
    
    create: function(req, res){
      passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/',
        failureFlash : true
      });
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
          User.findOne({ 'local.email' : email }, function(err, user){
            if(err){ return done(err); }
            
            // Check for existing email
            if(user){
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
              // create the user
              var user            = new User();
              user.local.email    = email;
              user.local.password = user.generateHash(password);
              user.save(function(err){
                if(err){
                  return done(err);
                }
                return done(null, user);
              });
            }

          });
        } else if(!req.user.local.email){
          // The user is logged in but has no local account.
          // Presumably they're trying to connect a local account
          // Check if the email used to connect a local account is being used by another user
          User.findOne({ 'local.email' :  email }, function(err, user){
            if(err){ return done(err); }

            if(user){
              return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
              // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
            } else {
              var user = req.user;
              user.local.email = email;
              user.local.password = user.generateHash(password);
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