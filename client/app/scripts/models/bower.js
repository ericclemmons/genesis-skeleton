var Dependency    = require('./dependency');
var Dependencies  = require('./dependencies');


var Bower = Backbone.RelationalModel.extend({
  url: '/api/bower',

  relations: [{
    type:           Backbone.HasMany,
    key:            'dependencies',
    relatedModel:   Dependency,
    collectionType: Dependencies
  }],

  parse: function(response) {
    response.dependencies = _.map(response.dependencies, function(value, key) {
      return {
        name:     key,
        version:  value
      };
    });

    return response;
  }
});

module.exports = Bower;
