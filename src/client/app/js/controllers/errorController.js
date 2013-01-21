angular
  .module('app.controllers.error', [])
  .controller('app.controllers.error', [
    '$scope',
    '$location',
    function($scope, $location) {
      $scope.location = $location;
    }
  ])
;
