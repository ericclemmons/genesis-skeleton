var Dependency    = require('./dependency');
var Dependencies  = require('./dependencies');


var NPMDependency = Dependency.extend({
  urlRoot: 'https://npmjs.org/package/',

  url: function() {
    return this.urlRoot + this.get('name');
  }
});

var NPM = Backbone.RelationalModel.extend({
  url: '/api/package',

  relations: [{
    type:           Backbone.HasMany,
    key:            'dependencies',
    relatedModel:   NPMDependency,
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

module.exports = NPM;
