import React              from 'react';
import TestUtils          from 'react/lib/ReactTestUtils';
import Register             from '../../../client/js/components/users/register';
import StubRouterContext  from '../../support/stub_router_context';
import _                  from "lodash";

function findTextField(textFields, labelText){
  return _.find(textFields, function(field){
    let label = TestUtils.findRenderedDOMComponentWithTag(field, 'label');
    return label.getDOMNode().textContent.toLowerCase() == labelText;
  });
}

describe('register', function() {
  var register;
  var Subject

  beforeEach(function() {
    // Render component wrapped in router context
    Subject = StubRouterContext(Register, {});
    register = TestUtils.renderIntoDocument(<Subject/>);
  });

  it('renders the register component', function() {
    expect(register).toBeDefined();

    let textFields = TestUtils.scryRenderedDOMComponentsWithClass(register, 'mui-text-field');

    let email = findTextField(textFields, 'email');
    expect(email).toBeDefined();

    let password = findTextField(textFields, 'password');
    expect(password).toBeDefined();
  });

  it('outputs a validation error if no email is provided', function(){
    let button = TestUtils.findRenderedDOMComponentWithClass(register, 'sign-up-button');
    //This only triggers the onTouchTap event for the button, not the form submit.
    TestUtils.Simulate.click(button.getDOMNode());

    //These are failing on setState for some reason.
    //let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    //TestUtils.Simulate.submit(form);

    expect(register.getDOMNode()).toContain('Invalid email');
  });

});
