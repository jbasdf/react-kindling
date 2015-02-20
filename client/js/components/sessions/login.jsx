/* @flow weak */

"use strict";

import React from "react";
import Router from "react-router";
const Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return (<div>
      <form action="/login" method="post">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Login</button>
      </form>
      <ul>
        <li><a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a></li>
        <li><a href="/auth/twitter" className="btn btn-info"><span className="fa fa-twitter"></span> Twitter</a></li>
        <li><a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"></span> Google+</a></li>
      </ul>  
      <p>Need an account? <Link to="register">Sign Up</Link></p>
      <p>Or go <Link to="home">home</Link>.</p>
    </div>);
  }
});