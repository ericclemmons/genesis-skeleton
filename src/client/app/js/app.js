module.exports = angular.module('app', [
  require('./controllers/guide').name,
  require('./controllers/error').name,
  require('./directives').name,
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
}]);
