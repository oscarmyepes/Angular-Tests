var mock = mock || {};

mock.tabsService = function () {
    var service = {};

      /*METHODS DEFINITION*/
      var self = service;
      self.loadDashboard = loadDashboard;
      self.removeDashboardOpened = removeDashboardOpened;
      self.dasboardsOpened = [];
      self.currentDashboard = {};

      /*METHODS*/
      function loadDashboard(dashboard) {
       };

       function removeDashboardOpened(dashboard) {
       };

  return service;
}
