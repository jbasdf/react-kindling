/* @flow weak */

"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import EventEmitter   from "events";
import assign         from "object-assign";

const CHANGE_EVENT = 'change';

let _user = {};

// log the user in
function login(email, password){
  return true;
}

// Register
function register(user){
  return true; 
}

// Extend User Store with EventEmitter to add eventing capabilities
let UserStore = assign({}, EventEmitter.prototype, {

  // Return current user
  current(){
    return _user;
  },

  loggedIn(){
    return _user.email !== undefined;
  },

  // Emit Change event
  emitChange(){
    this.emit(CHANGE_EVENT);
  },

  // Add change listener
  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback);
  },

  // Remove change listener
  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback with Dispatcher
Dispatcher.register(function(payload) {
  let action = payload.action;
  
  switch(action){

    // Respond to LOGIN action
    case Constants.LOGIN:
      login(payload.email, payload.password);
      break;

    // Respond to REGISTER action
    case Constants.REGISTER:
      register(payload.user);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  UserStore.emitChange();

  return true;

});

export default UserStore;

