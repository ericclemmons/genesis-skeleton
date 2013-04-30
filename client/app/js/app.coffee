angular
  .module('app', [])
  .config(['$routeProvider', ($router) ->
    $router.when('/',
      controller:   'homeController'
      templateUrl:  'app/templates/home.html'
    )
  ])
