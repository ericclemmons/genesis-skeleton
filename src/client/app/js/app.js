angular
  .module('app', [
    'app.controllers',
    'app.directives'
  ])
  .config(['$locationProvider', '$routeProvider', function($location, $router) {
    $router
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        templateUrl: 'app/partials/home.html'
      })
      .when('/guide', {
        controller: 'app.controllers.guide',
        templateUrl: 'app/partials/guide.html'
      })
      .otherwise({
        controller: 'app.controllers.error',
        templateUrl: 'app/partials/error/index.html'
      })
    ;
  }])
;
