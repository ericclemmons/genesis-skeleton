angular
  .module('app', [])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($location, $router) {
      $location
        .html5Mode(true)
        .hashPrefix('#!')
      ;
      $router
        .otherwise({
          controller:   'homeController',
          templateUrl:  'app/templates/home.html'
        })
      ;
    }
  ])
;
