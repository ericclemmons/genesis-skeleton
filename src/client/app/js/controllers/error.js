module.exports = error = angular.module('app.controllers.error', []);

error.controller('app.controllers.error', [

  '$scope',
  '$location',

  function($scope, $location) {
    $scope.error  = $location.search().err || 404;
    $scope.url    = $location.url().replace(/(.*?).err=.*/, '$1');
  }

]);
