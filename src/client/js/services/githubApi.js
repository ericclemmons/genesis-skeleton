angular
  .module('app.services.githubApi', [
    'ngResource'
  ])
  .factory('githubApi', ['$resource', function($resource) {

    var api = $resource('https://api.github.com/repos/:owner/:repo/:section', {
      owner:        'ericclemmons',
      repo:         'genesis-skeleton'
    }, {
      query: {
        method:     'JSONP',
        params:     {
          callback: 'JSON_CALLBACK',
          state:    'open'
        },
        isArray:    false
      }
    });

    return api;
  }])
;
