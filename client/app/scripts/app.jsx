/**
 * @jsx React.DOM
 */

var HomeView = require('./views/home.jsx');


var App = Backbone.Router.extend({

  routes: {
    '*default': 'home'
  },

  home: function() {
    React.renderComponent(<HomeView />, document.getElementById('app'));
  }
});

module.exports = App;
