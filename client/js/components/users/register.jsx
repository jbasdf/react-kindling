/* @flow weak */

"use strict";

import React from 'react';
import { Link } from 'react-router';
import { Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";
import validator from "validator";

module.exports = React.createClass({
  
  getInitialState(){
    return {
      validations: {}
    };
  },
  
  validateEmail(e){
    return this.validate(
      validator.isEmail(this.refs.email.getValue()),
      { email: "Invalid email" }
    );
  },

  validatePassword(e){
    return this.validate(
      validator.isLength(this.refs.password.getValue(), 5),
      { password: "Password must be at least 5 characters" }
    );
  },

  validateConfirmPassword(){
    return this.validate(
      (this.refs.password.getValue() == this.refs.confirmPassword.getValue()),
      { confirmPassword: "Passwords do not match" }
    );
  },

  validate(isValid, newState){
    if(!isValid){
      this.setState(
        Object.assign(this.state.validations, newState)
      );
      return false;
    } else {
      return true;
    }
  },

  handleRegister(){
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
  },

  render(){
    return (<div>
      <Paper>
        <h1><span className="fa fa-sign-in"></span> Signup</h1>
        <form action="/signup" method="post" onSubmit={this.handleRegister}>
          <TextField hintText="johndoe@example.com" floatingLabelText="Email" errorText={this.state.validations.email} ref="email" onBlur={this.validateEmail} />
          <TextField hintText="******" floatingLabelText="Password" errorText={this.state.validations.password} ref="password" onBlur={this.validatePassword} />
          <TextField hintText="******" floatingLabelText="Confirm Password" errorText={this.state.validations.confirmPassword} ref="confirmPassword" onBlur={this.validateConfirmPassword} />
          <RaisedButton label="Signup" primary={true} />
        </form>
        <p>
          Already have an account? 
          <Link to="login">Login</Link>
        </p>
      </Paper>
    </div>);
  }

});



