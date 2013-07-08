/**
 * @jsx React.DOM
 */

var HomeView  = require('./views/home.jsx');


var Router = Backbone.Router.extend({
  routes: {
    '*default': 'home'
  },

  initialize: function(options) {
    this.component = options.component;
  },

  home: function() {
    this.component.setState({ view: <HomeView />});
  }
});

module.exports = Router;
