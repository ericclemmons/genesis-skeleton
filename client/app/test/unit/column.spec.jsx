/**
 * @jsx React.DOM
 */

var Column = require('../../scripts/components/column.jsx');


describe("<Column />", function() {
  it('should preserve class="test"', function() {
    var column = <Column class="test" />;

    expect(column.getClassName()).toBe("test");
  });

  it('should append "span6" to existing class', function() {
    var column = <Column class="test" cols="6" />;

    expect(column.getClassName()).toBe("test span6");
  });
});
