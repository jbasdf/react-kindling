module.exports = {

  finishAuth: function(kind, passport, req, res, next){
    passport.authenticate(kind, function(err, user, info) {
      
      if(err){ return next(err); }

      if(!user){  // HTTP status 422: user create failed
        return res.status(422).json(info);
      } 
      
      if(kind == 'local-login'){
        // User Registration was successful send back the user
        res.json({"user": req.user});
      } else {
        // OAuth login. Redirect to home page.
        res.redirect('/');
      }

    })(req, res, next);
  }

};