/* @flow weak */

"use strict";

import React from 'react';
import { Link } from 'react-router';
import { Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

module.exports = React.createClass({
  
  handleRegister(){
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
  },

  render(){
    return (<div>
      <h1><span className="fa fa-sign-in"></span> Signup</h1>
      <form action="/signup" method="post" onSubmit={this.handleRegister}>
        <TextField hintText="yofool@mycrib.com" floatingLabelText="Email" ref="email" />
        <TextField hintText="******" floatingLabelText="Password" ref="password" />
        <RaisedButton label="Signup" primary={true} />
      </form>
      <p>
        Already have an account? 
        <Link to="login">Login</Link>
      </p>
    </div>);
  }

});



