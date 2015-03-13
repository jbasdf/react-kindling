"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import assign         from "object-assign";
import _              from "lodash";

const MessageTimeout = 5000;

let _messages = [];
var messageCount = 0;

function addServerMessage(message){
  let message = JSON.parse(message.text).message;
  let messageId = addMessage(message);
  setTimeout(function(){
    removeMessage(messageId)
  }, MessageTimeout);
}

function removeMessage(messageId){
  delete _messages[messageId];
  MessagesStore.emitChange();
}

function addMessage(message){
  messageCount++;
  _messages[messageCount] = message;
  return messageCount;
}

// Extend Message Store with EventEmitter to add eventing capabilities
let MessagesStore = assign({}, StoreCommon, {

  // Return current messages
  current(){
    return _messages;
  },

  hasMessages(){
    return _.keys(_messages).length > 0;
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

