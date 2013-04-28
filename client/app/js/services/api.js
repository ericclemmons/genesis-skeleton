angular
  .module('app')
  .factory('apiService', [
    '$http',
    function($http) {
      return {
        client: $http.get('/api/bower'),
        server: $http.get('/api/package')
      };
    }
  ])
;
