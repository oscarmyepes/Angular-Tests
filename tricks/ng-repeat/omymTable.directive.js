'use strict';

angular.module('angularFullStackApp')
  .directive('omymTable', function ($compile, $templateCache) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        //element.text('this is the omymTable directive');

        scope.rows = [];
        scope.columns = ['A', 'B', 'C'];
        for (var i = 0; i < 10000; i++) {
          scope.rows.push(i);
        }


        // scope.columns = ['1','2','3','4'];

        scope.columns = '<td>{{row}}</td><td>{{row}}</td><td>{{row}}</td><td>{{row}}</td>';
        var template = $templateCache.get('tpl.html');
        template = template.replace('{{columns}}', scope.columns );
        element.html(template);
        $compile(element.contents())(scope);
      }
    };
  });
