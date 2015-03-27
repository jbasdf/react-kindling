"use strict";

import React              from 'react';
import TestUtils          from 'react/lib/ReactTestUtils';
import Register           from '../../../client/js/components/users/register';
import StubRouterContext  from '../../support/stub_router_context';
import Utils              from '../../support/utils';
import UserActions        from '../../../client/js/actions/user';

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

    let confirmPassword = Utils.findTextField(textFields, 'confirm password');
    expect(confirmPassword).toBeDefined();
  });

  it('submits the login via the button', function(){
    // In the application clicking the button submits the form even though it's not a submit button
    // Need to figure out why and then add an appropriate test for submitting via the button
    //let button = TestUtils.findRenderedDOMComponentWithClass(register, 'sign-up-button');
    //This only triggers the onTouchTap event for the button, not the form submit.
    //TestUtils.Simulate.click(button.getDOMNode());
  });

  it('outputs a validation error if no email is provided', function(){
    let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    TestUtils.Simulate.submit(form);

    let email = Utils.findTextField(textFields, 'email');
    expect(email.getDOMNode().className).toContain('mui-has-error');
    expect(register.getDOMNode().textContent).toContain('Invalid email');
  });

  it('clears the email error after the user enters a valid email', function(){

    // Submit the form to put it into an invalid state
    let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    TestUtils.Simulate.submit(form);

    // Find the email material ui component and it's input field
    let email = Utils.findTextField(textFields, 'email');
    let emailInput = TestUtils.findRenderedDOMComponentWithTag(email, 'input');

    // Set a valid email and blur the field
    emailInput.getDOMNode().value = "johndoe@example.com";
    TestUtils.Simulate.blur(emailInput);

    // Test to make sure the email is now valid
    expect(email.getDOMNode().className).not.toContain('mui-has-error');
    expect(register.getDOMNode().textContent).not.toContain('Invalid email');
  });

  it('ensures the password is at least 5 chars', function(){
// Joseph
  });

  it('clears the password error after the user enters a valid password', function(){
    let password = Utils.findTextField(textFields, 'password');
    let passwordInput = TestUtils.findRenderedDOMComponentWithClass(password, 'mui-text-field-input');
    
    TestUtils.Simulate.blur(passwordInput.getDOMNode());

    expect(password.getDOMNode().className).toContain('mui-has-error');
    expect(password.getDOMNode().textContent).toContain('Password must be at least 5 characters');

    passwordInput.getDOMNode().value = "aoeuaoeu";

    TestUtils.Simulate.blur(passwordInput.getDOMNode());

    expect(password.getDOMNode().className).not.toContain('mui-has-error');
    expect(password.getDOMNode().textContent).not.toContain('Password must be at least 5 characters');

  });

  it('ensures the password confirmation matches', function(){
  	let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    let password = Utils.findTextField(textFields, 'password');
    let passwordInput = TestUtils.findRenderedDOMComponentWithClass(password, 'mui-text-field-input');
    let confirmPassword = Utils.findTextField(textFields, 'confirm password');
    let confirmPasswordInput = TestUtils.findRenderedDOMComponentWithClass(confirmPassword, 'mui-text-field-input');
    let email = Utils.findTextField(textFields, 'email');
    let emailInput = TestUtils.findRenderedDOMComponentWithTag(email, 'input');
    let expectedRegisterObject ={
      email: "johndoe@example.com",
      password: "aoeuaoeu",
      badpassword: "asdfasdf"
    };

    emailInput.getDOMNode().value = expectedRegisterObject.email;
    passwordInput.getDOMNode().value = expectedRegisterObject.password;
    confirmPasswordInput.getDOMNode().value = expectedRegisterObject.badpassword;
    TestUtils.Simulate.blur(confirmPasswordInput);

    // Test to make sure the password is not valid
    expect(confirmPassword.getDOMNode().className).toContain('mui-has-error');
    expect(register.getDOMNode().textContent).toContain('Passwords do not match');

    confirmPasswordInput.getDOMNode().value = expectedRegisterObject.password;

    TestUtils.Simulate.blur(confirmPasswordInput.getDOMNode());

    // Test to make sure the password is now valid
    expect(confirmPassword.getDOMNode().className).not.toContain('mui-has-error');
    expect(register.getDOMNode().textContent).not.toContain('Passwords do not match');
  });

  it('Doesn\'t allow form submission if there are validation errors', function(){
// David
    // hint: same test as below, but with an invalid email or confirm password input doesn't match, etc.
  });

  it('submits the form if all fields are valid', function(){
    //arrange
    let form = TestUtils.findRenderedDOMComponentWithTag(register, 'form');
    let password = Utils.findTextField(textFields, 'password');
    let passwordInput = TestUtils.findRenderedDOMComponentWithClass(password, 'mui-text-field-input');
    let confirmPassword = Utils.findTextField(textFields, 'confirm password');
    let confirmPasswordInput = TestUtils.findRenderedDOMComponentWithClass(confirmPassword, 'mui-text-field-input');
    let email = Utils.findTextField(textFields, 'email');
    let emailInput = TestUtils.findRenderedDOMComponentWithTag(email, 'input');
    let expectedRegisterObject ={
      email: "johndoe@example.com",
      password: "aoeuaoeu"
    };

    emailInput.getDOMNode().value = expectedRegisterObject.email;
    passwordInput.getDOMNode().value = expectedRegisterObject.password;
    confirmPasswordInput.getDOMNode().value = expectedRegisterObject.password;
    spyOn(UserActions, 'register');
    
    //act
    TestUtils.Simulate.submit(form);
  
    //assert
    expect(UserActions.register).toHaveBeenCalledWith(expectedRegisterObject);
  });

});
