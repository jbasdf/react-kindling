"use strict";

export default {

  params(){
    var queryDict = {};
    var vars = window.location.search.substring(1).split('&');
    for (var i = 0; i < vars.length; i++){
      var pair = vars[i].split('=');
      queryDict[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return queryDict;
  }

};
