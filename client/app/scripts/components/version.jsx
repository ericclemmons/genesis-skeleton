/**
 * @jsx React.DOM
 */


var NPM = require('../models/npm');

var Version = React.createClass({
  componentWillMount: function() {
    var npm = new NPM();

    npm.fetch().then(function(response) {
      this.setState({
        version: response.version
      })
    }.bind(this));
  },

  getInitialState: function() {
    return {
      version: null
    };
  },

  render: function() {
    return (
      <span>v{this.state.version}</span>
    );
  }
});

module.exports = Version;
