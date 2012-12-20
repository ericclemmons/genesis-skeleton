angular
  .module('app', [])
  .config(['$routeProvider', function($router) {
    $router.when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    });
  }])
;
