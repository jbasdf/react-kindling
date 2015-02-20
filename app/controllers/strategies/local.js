module.exports = function(app, passport){

  return {
    
    create: function(req, res){
      passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/',
        failureFlash : true
      })(req, res);
    },

    destroy: function(req, res){
      req.logout();
      res.redirect('/');
    },

    unlink: function(req, res){
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
        res.redirect('/');
      });
    },

    // Called by passport when a user logs in
    strategyCallback: function(req, email, password, done){
      if(email){
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
      }
      process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {
          if(err){ return done(err); }
          
          if(!user){
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          }

          if(!user.validPassword(password)){
            return done(null, false, req.flash('loginMessage', 'Wrong password.'));
          } else {
            // user logged in successfully
            return done(null, user);
          }
              
        });
      });
    }

  };
  
}