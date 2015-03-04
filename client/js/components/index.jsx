/* @flow weak */

"use strict";

import React                from "react";
import User                 from "../stores/user";
import {RouteHandler, Link} from "react-router";
import { Toolbar, ToolbarGroup, Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

<<<<<<< HEAD

 
=======
// Method to retrieve state from stores
function getState(){
  return {
    user:     User.current(),
    loggedIn: User.loggedIn()
  };
}
>>>>>>> 09a3e4e885f9750f9274cad0124de586bf7d47bd

export default React.createClass({

  getInitialState(){
    return getState();
  },

  // Method to update state based upon store changes
  storeChanged(){
    this.setState(getState());
  },

  // Listent for changes in the stores
  componentDidMount(){
    User.addChangeListener(this.storeChanged);
  },

  // Remove change listers from stores
  componentWillUnmount(){
    User.removeChangeListener(this.storeChanged);
  },

  render(){
    
    let loginOrOut = this.state.loggedIn ?
      <Link to="logout">Logout</Link> :
      <Link to="login"><span className="fa fa-user"></span> Login</Link>;

    let register = this.state.loggedIn ?
      "" :
      <li><Link to="register">Sign Up</Link></li>;

    let dashboard = this.state.loggedIn ?
      <li><Link to="dashboard">Dashboard</Link></li> :
      "" ;

    return (
      <div>
        <header>
          <ul>
            <li>{loginOrOut}</li>
            {register}
            <li><Link to="home">Home</Link></li>
            <li><Link to="connections">Connections</Link></li>
            {dashboard}
          </ul>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});