var StrategyCommon  = require("./strategy_common");

module.exports = function(app, passport){

  return {
    
    create: function(req, res){
      StrategyCommon.finishAuth('local-login', passport, req, res, next);
    },

    destroy: function(req, res){
      req.logout();
      res.json({"user": {}});
    },

    unlink: function(req, res){
      var user      = req.user;
      user.email    = undefined;
      user.password = undefined;
      user.save(function(err) {
        res.json({"user": {}});
      });
    },

    // Called by passport when a user logs in
    strategyCallback: function(req, email, password, done){
      if(email){
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
      }
      process.nextTick(function() {
        User.findOne({ 'email' :  email }, function(err, user) {
          if(err){ return done(err); }
          
          if(!user){
            return done(null, false, { 'message' : 'No user found.' });
          }

          if(!user.validPassword(password)){
            return done(null, false, { 'message' : 'Wrong password.' } );
          } else {
            // user logged in successfully
            return done(null, user);
          }
              
        });
      });
    }

  };
  
}