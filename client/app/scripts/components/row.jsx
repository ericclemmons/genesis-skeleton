/**
 * @jsx React.DOM
 */

var Row = React.createClass({
  render: function() {
    return (
      <div class="row-fluid">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Row;
