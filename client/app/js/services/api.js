angular
  .module('app')
  .factory('app.services.api', [
    '$resource',
    function($resource) {
      return {
        serverConfig: $resource('/api/config/package.json'),
        clientConfig: $resource('/api/config/component.json')
      };
    }
  ])
;
