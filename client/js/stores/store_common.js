"use strict";

import assign         from "object-assign";
import EventEmitter   from "events";

const CHANGE_EVENT = 'change';

export default assign({}, EventEmitter.prototype, {

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