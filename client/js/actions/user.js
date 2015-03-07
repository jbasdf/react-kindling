"use strict";

import Constants   from   "../constants";
import Api         from   "./api";

export default {

  login(payload){
    Api.post(Constants.LOGIN, "sessions/", payload);
  },

  register(payload) {
    Api.post(Constants.REGISTER, "users/", payload);
  }

};