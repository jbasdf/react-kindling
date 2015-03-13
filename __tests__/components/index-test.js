var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var expect = require('expect');
var Index = require('../../client/js/components/index');

describe('index', function() {
  it('renders the main navigation', function() {

    var TestUtils = React.addons.TestUtils;

    // Render into the document
    var index = TestUtils.renderIntoDocument(<Subject />);

    expect(index).toExist();

  });
});
