/**
 * @jsx React.DOM
 */

var Helpers = require('../mixins/helpers.jsx');

var List = React.createClass({
  mixins: [Helpers],

  render: function() {
    return (
      <table class="table table-striped table-bordered table-hover table-condensed">
        <tbody>
          {this.repeat(this.props.collection.attributes, this.renderRow)}
        </tbody>
      </table>
    );
  },

  renderRow: function(value, key) {
    return (
      <tr>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
  }
});

module.exports = List;
