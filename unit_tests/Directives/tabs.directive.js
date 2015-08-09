'use strict';

angular.module('xtiva.component.tabs')
.directive('xtivaTabs', [
  '$templateCache', '$compile', 'tabsService', '$filter',
    function($templateCache, $compile, tabsService, $filter) {
  return {
    restrict: 'E',
    templateUrl: 'components/tabs/tabs.html',
    controller:  function ($scope, $element) {
    },
    link: function postLink(scope, element, attrs) {

      scope.switchTab = function(item) {
        var currExists = $filter('filter')(tabsService.dasboardsOpened, {did: item.did});
        tabsService.currentDashboard = currExists[0] || tabsService.currentDashboard;
        selectCurrentTab();
      };

      scope.$watch(function() {
          return tabsService.currentDashboard;
        }, function(newValue) {
          selectCurrentTab();
        });

        scope.removeTab = function(dashboard) {
          tabsService.removeDashboardOpened(dashboard);
        };

        function selectCurrentTab() {
          var currrentDashboard = tabsService.currentDashboard;
          scope.dasboardsOpened = tabsService.dasboardsOpened;
          if (currrentDashboard && currrentDashboard.did) {
            scope.dashboardId = currrentDashboard.did;
            angular.forEach(scope.dasboardsOpened, function(item) {
                item.show = false;
                if (item.did === currrentDashboard.did) {
                  item.show = true;
                }
            });
          }
        }

    }
  };
}]);
