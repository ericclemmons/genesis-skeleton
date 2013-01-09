angular
  .module('app', [
    'app.templates',
    'ngResource'
  ])
  .config(['$routeProvider', function($router) {
    $router.when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    });
  }])
;
