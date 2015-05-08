"use strict";

import Constants   from   "../constants";
import Dispatcher  from   "../dispatcher";

export default {

  load(defaultSettings){
    Dispatcher.dispatch({ action: Constants.SETTINGS_LOAD, data: defaultSettings });
  }

};