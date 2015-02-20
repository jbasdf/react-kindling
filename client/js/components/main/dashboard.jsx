/* @flow weak */

"use strict";

import React from "react";
import Router from "react-router";

const Link = Router.Link

module.exports = React.createClass({
  render: function(){
    return (<div>
      <div className="page-header text-center">
        <h1><span className="fa fa-anchor"></span> Dashboard</h1>
        <Link to="logout">Logout</Link>
      </div>
    </div>);
  }
});


      // <div className="row">
      //   <div className="col-sm-6">
      //     <div className="well">
      //       <h3><span className="fa fa-user"></span> Local</h3>
      //       <% if (user.local.email) { %>
      //         <p>
      //           <strong>id</strong>: <%= user._id %><br>
      //           <strong>email</strong>: <%= user.local.email %><br>
      //           <strong>password</strong>: <%= user.local.password %>
      //         </p>
      //         <a href="/unlink/local" className="btn btn-default">Unlink</a>
      //       <% } else { %>
      //         <a href="/connect/local" className="btn btn-default">Connect Local</a>
      //       <% } %>
      //     </div>
      //   </div>
      //   <div className="col-sm-6">
      //     <div className="well">
      //       <h3 className="text-primary"><span className="fa fa-facebook"></span> Facebook</h3>
      //       <% if (user.facebook.token) { %>
      //         <p>
      //           <strong>id</strong>: <%= user.facebook.id %><br>
      //           <strong>token</strong>: <%= user.facebook.token %><br>
      //           <strong>email</strong>: <%= user.facebook.email %><br>
      //           <strong>name</strong>: <%= user.facebook.name %><br>
      //         </p>

      //         <a href="/unlink/facebook" className="btn btn-primary">Unlink</a>
      //       <% } else { %>
      //         <a href="/connect/facebook" className="btn btn-primary">Connect Facebook</a>
      //       <% } %>

      //     </div>
      //   </div>
      // </div>
      // <div className="row">
      //   <div className="col-sm-6">
      //     <div className="well">
      //       <h3 className="text-info"><span className="fa fa-twitter"></span> Twitter</h3>
      //       <% if (user.twitter.token) { %>
      //         <p>
      //           <strong>id</strong>: <%= user.twitter.id %><br>
      //           <strong>token</strong>: <%= user.twitter.token %><br>
      //           <strong>display name</strong>: <%= user.twitter.displayName %><br>
      //           <strong>username</strong>: <%= user.twitter.username %>
      //         </p>
      //         <a href="/unlink/twitter" className="btn btn-info">Unlink</a>
      //       <% } else { %>
      //         <a href="/connect/twitter" className="btn btn-info">Connect Twitter</a>
      //       <% } %>
      //     </div>
      //   </div>
      //   <div className="col-sm-6">
      //     <div className="well">
      //       <h3 className="text-danger"><span className="fa fa-google-plus"></span> Google+</h3>

      //       <% if (user.google.token) { %>
      //         <p>
      //           <strong>id</strong>: <%= user.google.id %><br>
      //           <strong>token</strong>: <%= user.google.token %><br>
      //           <strong>email</strong>: <%= user.google.email %><br>
      //           <strong>name</strong>: <%= user.google.name %>
      //         </p>

      //         <a href="/unlink/google" className="btn btn-danger">Unlink</a>
      //       <% } else { %>
      //         <a href="/connect/google" className="btn btn-danger">Connect Google</a>
      //       <% } %>

      //     </div>
      //   </div>
      // </div>