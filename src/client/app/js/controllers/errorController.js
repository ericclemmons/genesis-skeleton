angular
  .module('app.controllers.error', [])
  .controller('app.controllers.error', [
    '$scope',
    '$location',
    function($scope, $location) {
      $scope.url = $location.url().replace(/^\/error/, '');
    }
  ])
;
