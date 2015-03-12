"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import assign         from "object-assign";
import _              from "lodash";

let _messages = [];

function addServerMessage(message){
  let message = JSON.parse(message.text).message;
  addMessage(message);
  setTimeout(function(){
    _messages = _.reject(_messages, function(msg){
      return msg == message;
    });
    MessagesStore.emitChange();
  }, 3000);
}

function addMessage(message){
  _messages.push(message);
}

// Extend User Store with EventEmitter to add eventing capabilities
let MessagesStore = assign({}, StoreCommon, {

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
  MessagesStore.emitChange();

  return true;

});

export default MessagesStore;

