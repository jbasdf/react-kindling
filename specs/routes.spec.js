import React    from 'react';
import Router   from 'react-router';

import routes   from '../client/js/routes';

let Route = Router.Route;

describe('default route', function () {
  it('renders home', function (done) {
    Router.run(routes, '/', function (Handler, state){
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Home/);
      done();
    });
  });
});

describe('about route', function () {
  it('renders about', function (done) {
    Router.run(routes, '/about', function (Handler, state){
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/About/);
      done();
    });
  });
});
