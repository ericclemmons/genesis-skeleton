angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'app:controllers.home',
        templateUrl: 'app/templates/home.html'
      })
    ;
  })
;
