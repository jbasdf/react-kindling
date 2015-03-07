"use strict";

import React        from "react";
import { Link }     from "react-router";

export default React.createClass({
  render(){
    return (<div>
      <div className="page-header text-center">
        <h1><span className="fa fa-anchor"></span> I am the Dashboard</h1>
        <Link to="logout">Logout</Link>
      </div>
    </div>);
  }
});