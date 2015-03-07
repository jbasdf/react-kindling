"use strict";

import React        from 'react';
import Messages     from "../../stores/messages";
import Message      from "./message";
import StoreKeeper  from "../mixins/store_keeper";
import { Paper, FlatButton, RaisedButton, FontIcon } from "material-ui";

export default React.createClass({

  mixins: [StoreKeeper],

  statics: {
    stores: [Messages],   // Subscribe to changes in the messages store
    getState: () => {     // Method to retrieve state from stores
      return {
        messages: Messages.current()
      };
    }
  },

  render() {

    let messages = this.state.messages.map(function(message){
      return <Message>{message}</Message>
    });

    return (
      <Paper className="error-paper">
        <ul>
          {messages}
        </ul>
      </Paper>
    );
  }
});
