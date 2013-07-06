var Package = require('./package');


var Packages = Backbone.Collection.extend({
  url: '/api/package',

  model: Package,

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

module.exports = Packages;
