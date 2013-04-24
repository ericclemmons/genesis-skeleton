angular
  .module('app', [
    'ngResource'
  ])
  .config(['$routeProvider', function($router) {
    $router
      .when('/', {
        controller:   'app.controllers.home',
        templateUrl:  'app/partials/home.html'
      })
    ;
  }])
;
