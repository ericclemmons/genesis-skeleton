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
        templateUrl: 'views/home.html'
      })
      .when('/guide', {
        controller: 'app.controllers.guide',
        templateUrl: 'views/guide.html'
      })
      .otherwise({
        controller: 'app.controllers.error',
        templateUrl: 'views/error/index.html'
      })
    ;
  }])
;
