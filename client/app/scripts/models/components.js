var Component = require('./Component');


var Components = Backbone.Collection.extend({
  url: '/api/bower',

  model: Component,

  parse: function(response) {
    var models = _.map(response.dependencies, function(value, key) {
      return {
        name:     key,
        version:  value
      };
    });

    return models;
  }
});

module.exports = Components;
