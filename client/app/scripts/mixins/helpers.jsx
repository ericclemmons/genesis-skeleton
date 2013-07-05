/**
 * @jsx React.DOM
 */

var Helpers = {
  repeat: function(items, callback) {
    return _.map(items, callback);
  }
};

module.exports = Helpers;
