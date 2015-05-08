"use strict";

import React        from 'react';
import Messages     from "../../stores/messages";
import Message      from "./message";
import StoreKeeper  from "../mixins/store_keeper";
import { Toolbar } from "material-ui";

export default React.createClass({

  mixins: [StoreKeeper],

  statics: {
    stores: [Messages],   // Subscribe to changes in the messages store
    getState: () => {     // Method to retrieve state from stores
      return {
        messages: Messages.current(),
        hasMessages: Messages.hasMessages()
      };
    }
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
