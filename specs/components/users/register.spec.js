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

  it('clears the email error after the user enters a valid email', function(){
    let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    TestUtils.Simulate.submit(form);

    let email = Utils.findTextField(textFields, 'email');

    let input = TestUtils.findRenderedDOMComponentWithTag(email, 'input');

    //TestUtils.Simulate.keyDown(input, node, {key: "a"});
    TestUtils.Simulate.change(input, {target: {value: 'johndoe@example.com'}});
    TestUtils.Simulate.blur(input);
debugger; 
    expect(email.getDOMNode().className).not.toContain('mui-has-error');
    expect(register.getDOMNode().textContent).not.toContain('Invalid email');

  });

  it('ensures the password is at least 5 chars', function(){
// Joseph
  });

  it('clears the password error after the user enters a valid password', function(){
// James
  });

  it('ensures the password confirmation matches', function(){
// Kami - Kenneth
  });

  it('Doesn\'t allow form submission if there are validation errors', function(){
// David
  });

  it('submits the form if all fields are valid', function(){
//Joel
  });

});
