angular
  .module('app.controllers.error', [])
  .controller('ErrorController', [
    '$scope',
    '$location',
    function($scope, $location) {
      $scope.location = $location;
    }
  ])
;
