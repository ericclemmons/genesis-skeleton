angular
  .module('app')
  .controller('app.controllers.home', [
    '$scope',
    'app.services.api',
    function($scope, Api) {
      $scope.package = Api.get({ entity: 'package' });
    }
  ])
;
