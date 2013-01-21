angular
  .module('app', [
    'app.controllers',
    'app.directives',
    'app.templates'
  ])
  .config(['$locationProvider', '$routeProvider', function($location, $router) {
    $location.html5Mode(true);

    $router
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        controller: 'app.controllers.home',
        templateUrl: 'views/home.html'
      })
      .otherwise({
        controller: 'app.controllers.error',
        templateUrl: 'views/not-found.html'
      })
    ;
  }])
;
