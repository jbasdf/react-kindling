/* @flow weak */

"use strict";

import React from 'react';
import Router from 'react-router';

import routes from './routes';

// Set a device type based on window width, so that we can write media queries in javascript
// by calling if (this.props.deviceType === "mobile")
var deviceType;

if (window.matchMedia("(max-width: 639px)").matches){
  deviceType = "mobile";
} else if (window.matchMedia("(max-width: 768px)").matches){
  deviceType = "tablet";
} else {
  deviceType = "desktop";
}

Router.run(routes, (Handler) => {
  return React.render(<Handler routerState={state} deviceType={deviceType} environment="browser" />, document.body);
});

// Use the HTML5 history API for cleaner URLs:
// Router.run(routes, Router.HistoryLocation, (Handler) => {
//   return React.render(<Handler/>, document.body);
// });