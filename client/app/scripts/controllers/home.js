angular
  .module('app')
  .controller('app:controllers.home', [
    '$rootScope',
    '$scope',
    'apiService',
    function($rootScope, $scope, api) {
      api.server.then(function(response) {
        $rootScope.version = response.data.version;
      });

      $scope.client = api.client;
      $scope.server = api.server;
    }
  ])
;
