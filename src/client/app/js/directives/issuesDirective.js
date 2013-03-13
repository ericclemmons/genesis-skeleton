angular
  .module('app.directives.issues', [
    'app.services.github'
  ])
  .directive('appIssues', ['app.services.github', function(github) {
    return {
      replace:      false,
      restrict:     'A',
      templateUrl:  'app/partials/issues.html',
      transclude:   true,
      link:         function($scope, $element, attrs, controller) {
        $scope.issues = github.query({ section: 'issues'});
      }
    };
  }])
;
