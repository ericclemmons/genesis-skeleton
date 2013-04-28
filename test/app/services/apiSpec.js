describe('apiService', function() {
  var $httpBackend;
  var apiService;

  beforeEach(function() {
    module('app');

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.expectGET('/api/bower').respond({});
      $httpBackend.expectGET('/api/package').respond({});

      apiService = $injector.get('apiService');

      $httpBackend.flush();
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return { client: ..., server: ... }', function() {
    expect(apiService.client).toBeDefined();
    expect(apiService.server).toBeDefined();
  });
});
