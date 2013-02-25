var ApiService = require('../services/apiService');

module.exports = angular.module('app.controllers', [
  require('./errorController').name,
  require('./guideController').name,
  ApiService.name
]).run(['$rootScope', ApiService.name, function($root, api) {
  $root.package = api.get({ entity: 'package' });
}]);
