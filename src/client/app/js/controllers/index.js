var ApiService = require('../services/api');


module.exports = angular.module('app.controllers', [

  require('./error').name,
  require('./guide').name,
  ApiService.name

]).run([

  '$rootScope',
  ApiService.name,

  function($root, api) {
    $root.package = api.get({ entity: 'package' });
  }

]);
