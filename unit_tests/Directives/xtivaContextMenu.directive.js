/**
 * Directive based on ng-context-menu
 * ng-context-menu - v1.0.1 - An AngularJS directive to display a context menu
 * when a right-click event is triggered
 * *
 */

(function() {
  'use strict';

  angular
    .module('xtiva-context-menu')
    .directive('contextMenu', contextMenudirective);

  contextMenudirective.$inject = ['$document', 'contextMenuService'];

  function contextMenudirective($document, contextMenuService) {
    return {
      restrict: 'A',
      scope: {
        'callback': '&contextMenu',
        'disabled': '&contextMenuDisabled',
        'closeCallback': '&contextMenuClose',
        'contextMenu' : '='
      },
      link: function($scope, $element, $attrs) {
        var opened = false;

        function open(event, menuElement) {
          var offset = 0;
          var cellHeight = 60;
          //Check the relative position to the window and set the offset to show the context menu on the top of the mouse position event
          var clientY = event.clientY || 0;
          var bottomPos = $( window ).height() - clientY - ($scope.contextMenu.length * 26);
          if (bottomPos < 0) {
            offset = cellHeight - 30 + $scope.contextMenu.length * 26;
          }

          //This works in Chrome, Firefox
          var scrollTop = $(event.currentTarget).closest('.ui-grid-viewport').scrollTop();
          var currtargetPos = $(event.currentTarget).position();
          menuElement.css('top', + currtargetPos.top - scrollTop + cellHeight - offset +  'px');
          menuElement.css('left', currtargetPos.left + 'px');
          opened = true;

          menuElement.addClass('open');
          //Please do NOT remove, this is to show th context menu over other widgets
          //pending to define a better implementation rather than z-index
          /*$('[adf-id]').addClass('z-index-back');
          $(event.currentTarget).parents('[adf-id]').removeClass('z-index-back');*/
        }

        function close(menuElement) {
          menuElement.removeClass('open');
          /*$('[adf-id]').removeClass('z-index-back');*/

          if (opened) {
            $scope.closeCallback();
          }

          opened = false;
        }

        $element.bind('contextmenu', function(event) {
          if (!$scope.disabled()) {
            if (contextMenuService.menuElement !== null) {
              close(contextMenuService.menuElement);
            }
            contextMenuService.menuElement = angular.element(
              document.getElementById($attrs.target)
            );
            contextMenuService.element = event.target;

            event.preventDefault();
            event.stopPropagation();
            $scope.$apply(function() {
              $scope.callback({ $event: event });
            });
            $scope.$apply(function() {
              open(event, contextMenuService.menuElement);
            });
          }
        });

        function handleKeyUpEvent(event) {
          if (!$scope.disabled() && opened && event.keyCode === 27) {
            $scope.$apply(function() {
              close(contextMenuService.menuElement);
            });
          }
        }

        function handleClickEvent(event) {
          if (!$scope.disabled() &&
            opened &&
            (event.button !== 2 ||
            event.target !== contextMenuService.element)) {
            $scope.$apply(function() {
              close(contextMenuService.menuElement);
            });
          }
        }

        $document.bind('keyup', handleKeyUpEvent);
        // Firefox treats a right-click as a click and a contextmenu event
        // while other browsers just treat it as a contextmenu event
        $document.bind('click', handleClickEvent);
        $document.bind('contextmenu', handleClickEvent);

        $scope.$on('$destroy', function() {
          $document.unbind('keyup', handleKeyUpEvent);
          $document.unbind('click', handleClickEvent);
          $document.unbind('contextmenu', handleClickEvent);
        });
      }
    };
  }

})();
