/* navMenu.directive.js */

/**
* @desc navMenu Left that can be used anywhere across the Xtiva App
* @example <nav-menu></nav-menu>
*/

/**********************/
/* NavMenu Directive */
/**********************/

(function() {

  'use strict';

  angular
  .module('xtivaApp')
  .directive('navMenu', navMenu);

  navMenu.$inject = ['navMenuService'];

  function navMenu (navMenuService) {
    return {
      templateUrl: 'app/navMenu/navMenu.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        /*show dashboard list in navMenu*/
        navMenuService.getDashboardsList().then(function(data) {
          scope.dashboards = data.dashboards;
        });

        scope.loadDashboard = function(item) {
          navMenuService.loadDashboard(item);
        };

      }
    };
  }

})();
