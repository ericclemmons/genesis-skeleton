angular
  .module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'app.templates',
    'ngResource',
    '$strap.directives'
  ])
  .config(['$locationProvider', '$routeProvider', function($location, $router) {
    $location.html5Mode(true);

    $router
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        controller: 'HomeController',
        templateUrl: 'views/home.html'
      })
      .otherwise({
        controller: 'ErrorController',
        templateUrl: 'views/not-found.html'
      })
    ;
  }])
;
