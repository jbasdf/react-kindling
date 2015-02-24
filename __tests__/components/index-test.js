/** @jsx React.DOM */

import React from "react/addons";
import Index from "../../client/js/components/index";
import stubRouterContext from "../utils/stub_router_context";   

jest.dontMock('../../client/js/components/index.jsx');

describe('Index', function() {
  it('renders the main navigation', function() {
    
    var TestUtils = React.addons.TestUtils;
    var Subject = stubRouterContext(Index);
    
    // Render into the document
    var index = TestUtils.renderIntoDocument(
      <Subject />
    );

    var header = TestUtils.findRenderedDOMComponentWithTag(index, 'header');
    expect(header.toBeDefined());

  });
});