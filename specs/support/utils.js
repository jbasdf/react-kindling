import TestUtils          from 'react/lib/ReactTestUtils';
import _                  from "lodash";

export default {

  findTextField(textFields, labelText){
    return _.find(textFields, function(field){
      let label = TestUtils.findRenderedDOMComponentWithTag(field, 'label');
      return label.getDOMNode().textContent.toLowerCase() == labelText;
    });
  }

};