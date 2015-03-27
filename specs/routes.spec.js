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

describe('login route', function(){
  it('renders login', function (done) {
    Router.run(routes, '/login', function  (Handler, state) {
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Login/);
      done();
    });
  });
});

describe('register route', function(){
  it('renders register', function (done) {
    Router.run(routes, '/register', function  (Handler, state) {
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Signup/);
      done();
    });
  });
});

describe('logout route', function(){
  it('renders logout', function (done) {
    Router.run(routes, '/logout', function  (Handler, state) {
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Logout/);
      done();
    });
  });
});

describe('dashboard route', function(){
  it('renders dashboard', function (done) {
    Router.run(routes, '/dashboard', function  (Handler, state) {
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Dashboard/);
      done();
    });
  });
});

describe('connections route', function(){
  it('renders connections', function (done) {
    Router.run(routes, '/connections', function  (Handler, state) {
      var html = React.renderToString(<Handler/>);
      expect(html).toMatch(/Connections/);
      done();
    });
  });
});