import React              from 'react';
import TestUtils          from 'react/lib/ReactTestUtils';
import Register           from '../../../client/js/components/users/register';
import StubRouterContext  from '../../support/stub_router_context';
import Utils              from '../../support/utils';

describe('register', function() {
  var register;
  var Subject;
  var textFields;

  beforeEach(function() {
    // Render component wrapped in router context
    Subject = StubRouterContext(Register, {});
    register = TestUtils.renderIntoDocument(<Subject/>);
    textFields = TestUtils.scryRenderedDOMComponentsWithClass(register, 'mui-text-field');
  });

  it('renders the register component', function() {
    expect(register).toBeDefined();

    let textFields = TestUtils.scryRenderedDOMComponentsWithClass(register, 'mui-text-field');

    let email = Utils.findTextField(textFields, 'email');
    expect(email).toBeDefined();

    let password = Utils.findTextField(textFields, 'password');
    expect(password).toBeDefined();
  });

  it('outputs a validation error if no email is provided', function(){
    //let button = TestUtils.findRenderedDOMComponentWithClass(register, 'sign-up-button');
    //This only triggers the onTouchTap event for the button, not the form submit.
    //TestUtils.Simulate.click(button.getDOMNode());

    let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    TestUtils.Simulate.submit(form);

    let email = Utils.findTextField(textFields, 'email');
    expect(email.getDOMNode().className).toContain('mui-has-error');
    expect(register.getDOMNode().textContent).toContain('Invalid email');

  });

});