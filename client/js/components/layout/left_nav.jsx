"use strict";

import React                from "react";
import User                 from "../../stores/user";
import StoreKeeper          from "../mixins/store_keeper";
import Router               from "react-router";
import { LeftNav } from "material-ui";

export default React.createClass({

  mixins: [StoreKeeper],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    stores: [User],    // Subscribe to changes in the messages store
    getState: () => {  // Method to retrieve state from stores

      var loggedIn = User.loggedIn();

      var menuItems = [
        { route: 'home', text: 'Home' }
      ];

      if(loggedIn){
        menuItems.push({ route: 'logout', text: 'Logout' });
        menuItems.push({ route: 'dashboard', text: 'Dashboard' });
        menuItems.push({ route: 'connections', text: 'Connections' });
      } else {
        menuItems.push({ route: 'login', text: 'Sign In' });
        menuItems.push({ route: 'register', text: 'Sign Up' });
      }

      return {
        loggedIn: loggedIn,
        menuItems: menuItems
      };

    }
  },

  getInitialState: function() {
    return {
      selectedIndex: null
    };
  },

  render: function() {


    var header = <div className="logo" onClick={this._onHeaderClick}>Home</div>;

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={this.state.menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    var router = this.context.router;

    for (var i = this.state.menuItems.length - 1; i >= 0; i--) {
      currentItem = this.state.menuItems[i];
      if (currentItem.route && router.isActive(currentItem.route)) return i;
    }
  },

  _onLeftNavChange: function(e, key, payload) {
    var router = this.context.router;
    router.transitionTo(payload.route);
  },

  _onHeaderClick: function() {
    var router = this.context.router;
    router.transitionTo('root');
    this.refs.leftNav.close();
  }

});
