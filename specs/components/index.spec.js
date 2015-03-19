import React              from 'react';
import TestUtils          from 'react/lib/ReactTestUtils';
import Index              from '../../client/js/components/index';
import StubRouterContext  from '../support/stub_router_context';

describe('index', function() {
  it('renders the main chrome', function() {

    // Render component wrapped in router context
    let Subject = StubRouterContext(Index, {});
    
    let result = TestUtils.renderIntoDocument(<Subject/>);

    expect(result).toBeDefined();

  });
});
