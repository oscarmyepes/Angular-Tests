(function() {
    'use strict';

    angular
        .module('xtivaApp')
        .service('navMenuService', navMenuService);

    navMenuService.$inject = ['restFactory','appSettings', 'tabsService'];

    function navMenuService(restFactory, appSettings, tabsService) {
        /*METHODS DEFINITION*/
        this.getDashboardsList = getDashboardsList;
        this.loadDashboard = loadDashboard;

        /*METHODS*/
        function getDashboardsList() {
          return restFactory.show({ url: appSettings.dashboardUrl })
            .$promise.then(success, error);

          function success(response) {
            return response;
          }
          function error(error) {
            console.log('Error');
          }
        };

        function loadDashboard(dashboard) {
          tabsService.loadDashboard(dashboard);
        };
    }
})();
