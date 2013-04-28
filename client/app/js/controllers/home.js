angular
  .module('app')
  .controller('app.controllers.home', [
    '$scope',
    'app.services.api',
    function($scope, api) {
      angular.extend($scope, api);
    }
  ])
;
