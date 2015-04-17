module.exports = {

  finishAuth: function(kind, passport, req, res, next){
    passport.authenticate(kind, function(err, user, info) {
      
      if(err){ return next(err); }

      if(!user){  // HTTP status 422: user create failed
        return res.status(422).json(info);
      } 
      
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        // Redirect to home page.
        res.redirect('/');
      });

    })(req, res, next);
  }

};