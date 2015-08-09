(function() {
    'use strict';

    angular
        .module('xtiva.component.tabs')
        .service('tabsService', tabsService);

  tabsService.$inject = ['$filter'];
    function tabsService($filter) {
        /*METHODS DEFINITION*/
        var self = this;
        self.loadDashboard = loadDashboard;
        self.removeDashboardOpened = removeDashboardOpened;
        self.dasboardsOpened = [];
        self.currentDashboard = {};

        /*METHODS*/
        function loadDashboard(dashboard) {
           var current = _.find(self.dasboardsOpened, function(item){ return item.did === dashboard.did; });
           if (!current) {
             self.dasboardsOpened.push(dashboard);
             current = dashboard;
           }
           self.currentDashboard = current || {};
         };

         function removeDashboardOpened(dashboard) {
           var index = 0;
           self.dasboardsOpened = $filter('filter')(self.dasboardsOpened, function(tab, pos) {
             if (tab.did == dashboard.did) {
               index = pos;
             }
             return tab.did != dashboard.did;
           });

           if ((self.dasboardsOpened.length - 1) >= index) {
             self.currentDashboard = self.dasboardsOpened[index];
           } else if ((self.dasboardsOpened.length - 1) <= index) {
            self.currentDashboard = self.dasboardsOpened[self.dasboardsOpened.length - 1];
          }
        };

       }
})();
