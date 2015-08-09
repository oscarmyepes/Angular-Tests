var mock = mock || {};

mock.navMenuService = function (navMenuService, $q) {
    /*var service = {};

        /!*METHODS DEFINITION*!/
        service.getDashboardsList = getDashboardsList;
        service.loadDashboard = loadDashboard;

        /!*METHODS*!/
        function getDashboardsList() {
          var deferred = $q.defer();
          deferred.resolve('Response');
          return deferred.promise;
        };

        function loadDashboard(dashboard) {
          tabsService.loadDashboard(dashboard);
        };

  return service;*/

  spyOn(navMenuService, "getDashboardsList").andCallFake(function() {
    var deferred = $q.defer();
    deferred.resolve('Response');
    return deferred.promise;
  });

  spyOn(navMenuService, "loadDashboard").andCallFake(function(item) {

  });


}
