/**
 * @jsx React.DOM
 */

var Router = require('../router.jsx');


var View = React.createClass({
  componentWillMount: function() {
    new Router({ component: this });
    Backbone.history.start();
  },

  getInitialState: function() {
    return { view: null };
  },

  render: function() {
    return <div>{this.state.view}</div>;
  }
});

module.exports = View;
