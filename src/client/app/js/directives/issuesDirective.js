angular
  .module('app.directives.issues', [
    'app.services.github'
  ])
  .directive('appIssues', ['app.services.github', function(github) {
    return {
      replace:    false,
      restrict:   'A',
      template:   '<span ng-transclude />&nbsp;<span class="badge" ng-bind="issues.data.length" />',
      transclude: true,
      link:       function($scope, $element, attrs, controller) {
        $scope.issues = github.query({ section: 'issues'});
      }
    };
  }])
;
