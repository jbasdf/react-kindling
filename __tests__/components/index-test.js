/** @jsx React.DOM */

import React from "react";
import Index from "../../client/js/components/index";
    

jest.dontMock('../../client/js/components/index.jsx');

describe('Index', function() {
  it('renders the main navigation', function() {
    
    var TestUtils = React.addons.TestUtils;

    // Render into the document
    var index = TestUtils.renderIntoDocument(
      <Index />
    );

    var header = TestUtils.findRenderedDOMComponentWithTag(index, 'header');
    expect(header.toBeDefined());

  });
});