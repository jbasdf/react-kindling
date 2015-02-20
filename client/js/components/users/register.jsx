/* @flow weak */

"use strict";

import React from 'react';
import Link from 'react-router';

module.exports = React.createClass({
  render: function(){
    return (<div>
      <h1><span className="fa fa-sign-in"></span> Signup</h1>
      <form action="/signup" method="post">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>);
  }
});



