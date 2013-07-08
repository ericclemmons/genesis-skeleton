/**
 * @jsx React.DOM
 */

var NPM = Backbone.Model.extend({
  url: '/api/package'
});


var Version = React.createClass({
  componentWillMount: function() {
    var npm = new NPM();

    npm.fetch().then(this.handleResponse.bind(this));
  },

  getInitialState: function() {
    return {
      version: null
    };
  },

  handleResponse: function(response) {
    this.setState({
      version: response.version
    });
  },

  render: function() {
    return (
      <span>v{this.state.version}</span>
    );
  }
});

module.exports = Version;
