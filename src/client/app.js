angular
  .module('app', [
    'ngResource'
  ])
  .config(['$routeProvider', function($router) {
    $router.when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    });
  }])
;
