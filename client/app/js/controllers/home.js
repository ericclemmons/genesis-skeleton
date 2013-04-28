angular
  .module('app')
  .controller('homeController', [
    '$scope',
    'apiService',
    function($scope, api) {
      angular.extend($scope, api);
    }
  ])
;
