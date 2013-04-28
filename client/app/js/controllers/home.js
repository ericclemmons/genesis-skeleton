angular
  .module('app')
  .controller('app.controllers.home', [
    '$scope',
    'app.services.api',
    function($scope, Api) {
      $scope.server = Api.serverConfig.get({});
      $scope.client = Api.clientConfig.get({});
    }
  ])
;
