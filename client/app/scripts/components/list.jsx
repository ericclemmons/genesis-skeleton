/**
 * @jsx React.DOM
 */

var List = React.createClass({
  componentWillMount: function() {
    if (!this.props.collection instanceof Backbone.Collection) {
      throw new Error('this.props.collection must be instance of Backbone.Collection');
    }
  },

  render: function() {
    return (
      <table class="table table-striped table-bordered table-hover table-condensed">
        <tbody>
          {this.props.collection.map(this.renderRow)}
        </tbody>
      </table>
    );
  },

  renderRow: function(model) {
    var link = model.urlRoot ? <a href={model.url()}>{model.get('name')}</a> : model.get('name');

    return (
      <tr>
        <td>{link}</td>
        <td>{model.get('version')}</td>
      </tr>
    );
  }
});

module.exports = List;
