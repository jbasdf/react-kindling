"use strict";

import React        from "react";
import { Link }     from "react-router";
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

  handleLogin(e){
    e.preventDefault();
    if(this.validateAll()){
      UserActions.login({
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      });
    }
  },

  validateAll(){
    return _.every([
      this.validateEmail()
    ], (v)=> { return v; });
  },

  validate(isValid, invalidState, emptyState){
    if(!isValid){
      this.setState(Object.assign(this.state.validations, invalidState));
    } else {
      this.setState(Object.assign(this.state.validations, emptyState));
    }
    return isValid;
  },

  validateEmail(e){
    return this.validate(
      Validator.isEmail(this.refs.email.getValue()),
      { email: "Invalid email" },
      { email: "" }
    );
  },

  render: function(){
    return (<div className="login-screen">
      <Paper className="login-paper">
        <form action="/login" method="post" onSubmit={this.handleLogin}>
          <h4>Login</h4>

          <TextField hintText="johndoe@example.com" floatingLabelText="Email" ref="email" onBlur={this.validateEmail} errorText={this.state.validations.email} />
          <TextField type="password" hintText="******" floatingLabelText="Password" ref="password" />
          <Link to="register">Create Account</Link>

          <FlatButton className="login-button" label="Login" primary={true} />
        </form>
      </Paper>

      <div className="button-example-container">
        <RaisedButton className="auth-button" linkButton={true} href="/auth/facebook" secondary={true}>
          <FontIcon className="muidocs-icon-custom-facebook example-button-icon"/>
          <span className="mui-raised-button-label example-icon-button-label">Facebook</span>
        </RaisedButton>
      </div>

      <div className="button-example-container">
        <RaisedButton className="auth-button" linkButton={true} href="/auth/twitter" secondary={true}>
          <FontIcon className="muidocs-icon-custom-twitter example-button-icon"/>
          <span className="mui-raised-button-label example-icon-button-label">Twitter</span>
        </RaisedButton>
      </div>

      <div className="button-example-container">
        <RaisedButton className="auth-button" linkButton={true} href="/auth/google" secondary={true}>
          <FontIcon className="muidocs-icon-custom-google example-button-icon"/>
          <span className="mui-raised-button-label example-icon-button-label">Google+</span>
        </RaisedButton>
      </div>

    </div>);
  }
});
