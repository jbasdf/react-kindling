/* @flow weak */

"use strict";

import Dispatcher  from   "../dispatcher";
import Constants   from   "../constants";

export default {

  login(email, password){
    Dispatcher.dispatch({
      action: Constants.LOGIN,
      email: email,
      password: password
    });
  },

  register(user) {
    Dispatcher.dispatch({
      action: Constants.REGISTER,
      user: user
    });
  }

};