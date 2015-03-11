"use strict";

import Constants   from   "../constants";
import Api         from   "./api";
import Dispatcher  from "../dispatcher";

export default {

  login(payload){
    Dispatcher.dispatch({ action: Constants.LOGIN_PENDING });
    Api.post(Constants.LOGIN, "sessions/", payload);
  },

  register(payload) {
    Dispatcher.dispatch({ action: Constants.REGISTER_PENDING });
    Api.post(Constants.REGISTER, "users/", payload);
  }

};