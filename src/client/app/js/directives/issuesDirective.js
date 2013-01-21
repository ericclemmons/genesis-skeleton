angular
  .module('app.directives.issues', [
    'app.services.githubApi'
  ])
  .directive('appIssues', ['githubApi', function(api) {
    return {
      replace:    false,
      restrict:   'A',
      template:   '<span ng-transclude />&nbsp;<span class="badge" ng-bind="issues.data.length" />',
      transclude: true,
      link:       function($scope, $element, attrs, controller) {
        $scope.issues = api.query({ section: 'issues'});
      }
    };
  }])
;
