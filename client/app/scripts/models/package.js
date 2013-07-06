var Package = Backbone.Model.extend({
  urlRoot: 'https://npmjs.org/package/',

  url: function() {
    return this.urlRoot + this.get('name');
  }
});

module.exports = Package;
