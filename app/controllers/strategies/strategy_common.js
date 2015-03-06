module.exports = {

  finishAuth: function(kind, passport, req, res, next){
    passport.authenticate(kind, function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(422).json(info); } // HTTP status 422: user create failed
      // User Registration was successful send back the user
      res.json({"user": req.user});
    })(req, res, next);
  }

};