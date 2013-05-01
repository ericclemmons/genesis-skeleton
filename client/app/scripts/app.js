angular
  .module('app', [])
  .config(['$routeProvider', function($router) {
    $router
      .when('/', {
        controller:   'homeController',
        templateUrl:  'app/templates/home.html'
      })
    ;
  }])
;
