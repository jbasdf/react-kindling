//import expect   from 'expect';
import React    from 'react';
import Router   from 'react-router';

import routes   from '../client/js/routes';

var Route         = Router.Route;

describe('default route', function () {
  it('renders home', function (done) {
    Router.run(routes, '/', function (Handler, state){
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Home/);
      done();
    });
  });
});
