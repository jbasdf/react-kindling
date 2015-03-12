"use strict";

import React        from 'react';
import { Link }     from 'react-router';
import Validator    from "validator";
import UserActions  from "../../actions/user";
import _            from "lodash";
import { Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

export default React.createClass({
  
  getInitialState(){
    return {
    validations: {}
    };
  },
  
  validateEmail(e){
    return this.validate(
      Validator.isEmail(this.refs.email.getValue()),
      { email: "Invalid email" }
    );
  },

  validatePassword(e){
    return this.validate(
      Validator.isLength(this.refs.password.getValue(), 5),
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

  validateAll(){
    return _.every([
      this.validateEmail(),
      this.validatePassword(),
      this.validateConfirmPassword()
    ], (v)=> { return v });
  },

  handleRegister(e){
    e.preventDefault();
    if(this.validateAll()){
      UserActions.register({
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      });
    }
  },

  render(){
    return (<div>
      <Paper className="register-paper">
        <h1><span className="fa fa-sign-in"></span> Signup</h1>
        <form action="/signup" method="post" onSubmit={this.handleRegister}>
          <TextField hintText="johndoe@example.com" floatingLabelText="Email" errorText={this.state.validations.email} ref="email" onBlur={this.validateEmail} />
          <TextField type="password" hintText="******" floatingLabelText="Password" errorText={this.state.validations.password} ref="password" onBlur={this.validatePassword} />
          <TextField type="password" hintText="******" floatingLabelText="Confirm Password"  errorText={this.state.validations.confirmPassword} ref="confirmPassword" onBlur={this.validateConfirmPassword} />
          <RaisedButton className="sign-up-button"label="Signup" primary={true} />
        </form>
        <p>
          Already have an account? 
          <Link to="login">Login</Link>
        </p>
      </Paper>
    </div>);
  }

});



