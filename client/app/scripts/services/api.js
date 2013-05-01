angular
  .module('app')
  .factory('apiService', [
    '$http',
    function($http) {
      return {
        client: $http.get('../bower.json'),
        server: $http.get('../package.json')
      };
    }
  ])
;
