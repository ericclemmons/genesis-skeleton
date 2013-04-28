angular
  .module('app')
  .factory('app.services.api', [
    '$http',
    function($http) {
      return {
        server: $http.get('/api/package'),
        client: $http.get('/api/bower')
      };
    }
  ])
;
