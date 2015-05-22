"use strict";

import React        from 'react';
import Messages     from "../../stores/messages";
import Message      from "./message";
import StoreKeeper  from "../mixins/store_keeper";
import { Toolbar } from "material-ui";

export default React.createClass({


  getState(){
    return {
      messages: Messages.current(),
      hasMessages: Messages.hasMessages()
    };
  },

  getInitialState(){
    return this.getState();
  },

  // Method to update state based upon store changes
  storeChanged(){
    this.setState(this.getState());
  },

  // Listen for changes in the stores
  componentDidMount(){
    Messages.addChangeListener(this.storeChanged);
  },

  // Remove change listers from stores
  componentWillUnmount(){
    Messages.removeChangeListener(this.storeChanged);
  },

  render() {

    if(!this.state.hasMessages){
      return null;
    }

    var messages = this.state.messages.map(function(message){
      return <Message>{message}</Message>;
    });

    return (
      <Toolbar className="error-paper">
        <ul>
          {messages}
        </ul>
      </Toolbar>
    );
  }
});
