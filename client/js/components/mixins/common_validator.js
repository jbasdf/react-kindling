"use strict";

export default {

  validate(isValid, newState, emptyState){
    if(!isValid){
      this.setState(
        Object.assign(this.state.validations, newState)
      );
    } else {
      this.setState(
        Object.assign(this.state.validations, emptyState)
      );
    }
    return isValid;
  }

};
