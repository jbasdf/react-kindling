import React              from 'react';
import TestUtils          from 'react/lib/ReactTestUtils';
import Login              from '../../../client/js/components/sessions/login';
import StubRouterContext  from '../../support/stub_router_context';
import _                  from "lodash";

function findTextField(textFields, labelText){
  return _.find(textFields, function(field){
    let label = TestUtils.findRenderedDOMComponentWithTag(field, 'label');
    return label.getDOMNode().textContent.toLowerCase() == labelText;
  });
}

describe('login', function() {
  var login;
  var Subject

  beforeEach(function() {
    // Render component wrapped in router context
    Subject = StubRouterContext(Login, {});
    login = TestUtils.renderIntoDocument(<Subject/>);
  });

  it('renders the login component', function() {
    expect(login).toBeDefined();
    
    let textFields = TestUtils.scryRenderedDOMComponentsWithClass(login, 'mui-text-field');    
    
    let email = findTextField(textFields, 'email');
    expect(email).toBeDefined();

    let password = findTextField(textFields, 'password');
    expect(password).toBeDefined();
  });

  it('outputs a validation error if no email is provided', function(){
    let button = TestUtils.findRenderedDOMComponentWithClass(login, 'login-button');
    TestUtils.Simulate.click(button);

    //let form = TestUtils.findRenderedDOMComponentWithTag(login, 'form');
    //TestUtils.Simulate.submit(form);

    expect(login.getDOMNode()).toContain('Invalid email');
  });

});
