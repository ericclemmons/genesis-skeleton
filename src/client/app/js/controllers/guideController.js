module.exports = angular.module('app.controllers.guide', [])
  .controller('app.controllers.guide', [
    '$scope',
    function($scope) {
      var sections = [
        { id:       "requirements" }
      , { id:       "installation" }
      , { parent:   "installation", id: "download"  }
      , { parent:   "installation", id: "git"       }
      , { parent:   "installation", id: "upgrading" }
      ];

      $scope.toc = function(section) {
        var list  = [];
        var id    = section ? section.id : undefined;

        angular.forEach(sections, function(child) {
          if (child.parent === id) {
            list.push(child);
          }
        });

        return list;
      };

      var $parents = function($parent) {
        var list = [];

        // Ignore self-referencing parent
        $parent = $parent.$parent;

        // Traverse up until there are no more grandparents
        do {
          list.unshift($parent.section.id);

          $parent = $parent.$parent;
        } while($parent.section && $parent.$parent.section);

        return list;
      };

      $scope.id = function() {
        return $parents(this).join('-');
        // return this.section.id;
      };

      $scope.label = function() {
        var label = this.section.id;

        return label[0].toUpperCase() + label.slice(1);
      };

      $scope.template = function() {
        var ids = $parents(this);

        return 'app/partials/guide/' + ids.join('/') + '.html';
      };
    }
  ])
;
