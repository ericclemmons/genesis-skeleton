angular
  .module('app', [])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($location, $router) {
      $location.hashPrefix('!');

      $router
        .when('/', {
          controller:   'homeController',
          templateUrl:  'app/templates/home.html'
        })
      ;
    }
  ])
;
