angular
  .module('app', [
    'app.controllers',
    'app.directives',
    'app.templates'
  ])
  .config(['$locationProvider', '$routeProvider', function($location, $router) {
    $router
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        controller: 'app.controllers.home',
        templateUrl: 'views/home.html'
      })
      .when('/error/:url', {
        controller: 'app.controllers.error',
        templateUrl: 'views/errors/server-error.html'
      })
      .otherwise({
        controller: 'app.controllers.error',
        templateUrl: 'views/errors/not-found.html'
      })
    ;
  }])
;
