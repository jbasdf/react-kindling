/* @flow weak */

"use strict";

import React from "react";
import {RouteHandler, Link} from "react-router";

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <header>
          <ul>
            <li><Link to="login"><span className="fa fa-user"></span> Login</Link></li>
            <li><Link to="logout">Logout</Link></li>
            <li><Link to="register"><span className="fa fa-user"></span> Sign Up</Link></li>
            <li><Link to="home">Home</Link></li>
            <li><Link to="connections">Connections</Link></li>
            <li><Link to="dashboard">Dashboard</Link></li>
          </ul>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});