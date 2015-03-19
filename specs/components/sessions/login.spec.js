import React              from 'react';
import TestUtils          from 'react/lib/ReactTestUtils';
import Login              from '../../../client/js/components/sessions/login';
import StubRouterContext  from '../../support/stub_router_context';

describe('login', function() {
  it('renders the login component', function() {

    // Render component wrapped in router context
    let Subject = StubRouterContext(Login, {});
    
    let result = TestUtils.renderIntoDocument(<Subject/>);

    expect(result).toBeDefined();

  });
});
