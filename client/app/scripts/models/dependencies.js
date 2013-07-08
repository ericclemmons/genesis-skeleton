var Dependency = require('./dependency');


var Dependencies = Backbone.Collection.extend({
  model: Dependency
});

module.exports = Dependencies;
