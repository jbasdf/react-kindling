"use strict";

import _ from "lodash";

export default {
  
  getInitialState(){
    return this.constructor.getState();
  },

  // Method to update state based upon store changes
  storeChanged(){
    this.setState(this.constructor.getState());
  },

  // Listen for changes in the stores
  componentDidMount(){
    _.each(this.constructor.stores, function(store){
      store.addChangeListener(this.storeChanged);
    }.bind(this));
  },

  // Remove change listers from stores
  componentWillUnmount(){
    _.each(this.constructor.stores, function(store){
      store.removeChangeListener(this.storeChanged);
    }.bind(this));
  }

};