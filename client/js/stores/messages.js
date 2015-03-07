/* @flow weak */

"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import assign         from "object-assign";

let _messages = [];

function addServerMessage(message){
  addMessage(JSON.parse(message.text).message);
}

function addMessage(message){
  _messages.push(message);
}

// Extend User Store with EventEmitter to add eventing capabilities
let Store = assign({}, StoreCommon, {

  // Return current messages
  current(){
    return _messages;
  }

});

// Register callback with Dispatcher
Dispatcher.register(function(payload) {
  
  switch(payload.action){

    // Respond to TIMEOUT action
    case Constants.TIMEOUT:
      addMessage("Request timed out. Reponse was: " + payload.data);
      break;

    // Respond to NOT_AUTHORIZED action
    case Constants.NOT_AUTHORIZED:
      addServerMessage(payload.data);
      break;

    // Respond to ERROR action
    case Constants.ERROR:
      addServerMessage(payload.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  Store.emitChange();

  return true;

});

export default Store;

