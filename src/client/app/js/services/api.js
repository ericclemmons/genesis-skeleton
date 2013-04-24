angular
  .module('app')
  .factory('app.services.api', [
    '$resource',
    function($resource) {
      var api = $resource('/api/:entity');

      return api;
    }
  ])
;
