angular
  .module('app', [])
  .config(['$routeProvider', function($router) {
    $router
      .when('/', {
        controller:   'app.controllers.home',
        templateUrl:  'app/templates/home.html'
      })
    ;
  }])
;
