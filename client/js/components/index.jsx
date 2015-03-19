"use strict";

import React                from "react";
import Messages             from "./common/messages";
import LeftNav              from "./layout/left_nav";
import {RouteHandler}       from "react-router";
import { AppCanvas, AppBar, IconButton } from "material-ui";

export default React.createClass({

  render(){

    let title = "React Kindling";

    let githubButton = (
      <IconButton
        className="github-icon-button"
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/jbasdf/react-kindling"
        linkButton={true} />
    );

    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar
          className="mui-dark-theme"
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
          title={title}
          zDepth={0}>
          {githubButton}
        </AppBar>

        <LeftNav ref="leftNav" />

        <div className="mui-app-content-canvas page-with-nav">
          <Messages/>
          <div className="page-with-nav-content">
            <RouteHandler />
          </div>
        </div>

        <div className="footer full-width-section mui-dark-theme">
          <p>
            Built by <a href="http://www.atomicjolt.com">Atomic Jolt</a>.
          </p>
          {githubButton}
        </div>

      </AppCanvas>

    );
  },

  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  }

});
