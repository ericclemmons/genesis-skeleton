angular
  .module('app.services.api', [
    'ngResource'
  ])
  .factory('app.services.api', [
    '$location',
    '$resource',
    function($location, $resource) {
      var api = $resource('/api/:entity');

      return api;
    }
  ])
;
