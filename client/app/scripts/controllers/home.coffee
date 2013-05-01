angular
  .module('app')
  .controller('homeController', [
    '$rootScope',
    '$scope',
    'apiService',
    ($rootScope, $scope, api) ->
      api.server.then (response) ->
        $rootScope.version = response.data.version

      $scope.client = api.client
      $scope.server = api.server
  ])
