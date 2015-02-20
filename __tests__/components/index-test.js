/** @jsx React.DOM */

import React from "react";

jest.dontMock('../../client/js/components/index.jsx');

describe('Index', function() {
  it('renders the main navigation', function() {
    
    var Index = require('../../client/js/components/index.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render into the document
    var index = TestUtils.renderIntoDocument(
      <Index />
    );

    var header = TestUtils.findRenderedDOMComponentWithTag(
      header, 'label');
    expect(label.getDOMNode().textContent).toEqual('Off');

  });
});