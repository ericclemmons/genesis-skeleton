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

    $router.when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'views/home.html'
    });
  }])
;
