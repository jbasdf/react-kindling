"use strict";

import React                from "react";
import User                 from "../stores/user";
import StoreKeeper          from "./mixins/store_keeper";
import Messages             from "./common/messages";
import {RouteHandler, Link} from "react-router";
import { Toolbar, ToolbarGroup, Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

export default React.createClass({

  mixins: [StoreKeeper],

  statics: {
    stores: [User],    // Subscribe to changes in the messages store
    getState: () => {  // Method to retrieve state from stores
      return {
        user:     User.current(),
        loggedIn: User.loggedIn()
      };
    }
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
        <Messages/>
        <RouteHandler/>
      </div>
    );
  }
});