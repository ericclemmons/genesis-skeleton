describe('homeController', function() {
  var $scope;
  var homeController;
  var mockApiService = { server: {}, client: {} };

  beforeEach(function() {
    module('app');

    module(function($provide) {
      $provide.value('apiService', mockApiService);
    });

    inject(function($injector) {
      var $controller = $injector.get('$controller');

      $scope = $injector.get('$rootScope').$new();

      homeController = $controller('homeController', {
        $scope: $scope
      });
    });
  });

  it('should set scope.client', function() {
    expect($scope.client).toBeDefined();
  });

  it('should set scope.server', function() {
    expect($scope.server).toBeDefined();
  });
});
