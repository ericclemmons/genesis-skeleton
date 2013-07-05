var Components = Backbone.Model.extend({
  url: '/api/bower',

  parse: function(response) {
    return response.dependencies;
  }
});

module.exports = Components;
