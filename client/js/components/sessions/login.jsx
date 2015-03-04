/* @flow weak */

"use strict";

import React        from "react";
import { Link }     from "react-router";
import UserActions  from "../../actions/user";
import { Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

export default React.createClass({

  handleLogin(e){
    e.preventDefault();
    UserActions.register({
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    });
  },

  render: function(){
    return (<div className="login-screen">
      <Paper className="login-paper">
        <form action="/login" method="post" onSubmit={this.handleLogin}>
          <h4>Login</h4>
<<<<<<< HEAD

          <TextField hintText="yofool@mycrib.com" floatingLabelText="Email"/>
          <TextField hintText="******" floatingLabelText="Password"/> <br/>

          <Link to="register">Create Account</Link>
          
=======
          <TextField hintText="johndoe@example.com" floatingLabelText="Email" ref="email" />
          <TextField hintText="******" floatingLabelText="Password" ref="password" />
          <Link to="register">Create Account</Link>
>>>>>>> 09a3e4e885f9750f9274cad0124de586bf7d47bd
          <FlatButton label="Login" primary={true} />
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