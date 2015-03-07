"use strict";

import React from 'react';
import Router from 'react-router';

import Index from './components/index';
import Home from './components/main/home';
import Login from './components/sessions/login';
import Logout from './components/sessions/logout';
import Register from './components/users/register';
import Dashboard from './components/main/dashboard';
import NotFound from './components/not_found';
import Connections from './components/users/connections';

var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;

var routes = (
  <Route handler={Index}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="login" handler={Login}/>
    <Route name="register" handler={Register}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="connections" handler={Connections}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;