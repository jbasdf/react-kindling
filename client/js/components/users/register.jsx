/* @flow weak */

"use strict";

import React from 'react';
import { Link } from 'react-router';
import { Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

module.exports = React.createClass({
  
  handleClick(){
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
  },

  render(){
    return (<div>
      <Paper className="login-paper">
      <h1><span className="fa fa-sign-in"></span> Signup</h1>
      <form action="/signup" method="post">
        <TextField hintText="yofool@mycrib.com" floatingLabelText="Email" ref="email" />
        <TextField hintText="******" floatingLabelText="Password" ref="password" />
        <RaisedButton label="Signup" onTouchTap={this.handleClick} primary={true} />
      </form>
      <p>
        Already have an account?     
        <Link to="login">Login</Link>
      </p>
      </Paper>
    </div>);
  }

});



