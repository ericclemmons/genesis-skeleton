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
        templateUrl: 'partials/home.html'
      })
      .when('/guide', {
        controller: 'app.controllers.guide',
        templateUrl: 'partials/guide.html'
      })
      .otherwise({
        controller: 'app.controllers.error',
        templateUrl: 'partials/error/index.html'
      })
    ;
  }])
;
