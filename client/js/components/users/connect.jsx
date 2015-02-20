/* @flow weak */

"use strict";

import React from 'react';
import Link from 'react-router';

module.exports = React.createClass({
  render: function () {
    return (<div>
      <form action="/connect/local" method="post">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Add Local</button>
      </form>
    </div>);
  }
});



