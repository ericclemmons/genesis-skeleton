var Packages = Backbone.Model.extend({
  url: '/api/package',

  parse: function(response) {
    return response.dependencies;
  }
});

module.exports = Packages;
