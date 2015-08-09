var mock = mock || {};

mock.dashboardService = function ($q, $timeout) {
  var service = {};
  var currentDashboard;

  service.getData = function(dashboardId) {
    var deferred = $q.defer();
    deferred.resolve('Response');
    return deferred.promise;

  };

  service.getCurrentDashboard = function() {
    return {};
  };

  service.getWidgetDefinition = function(wdid) {
    var deferred = $q.defer();
    deferred.resolve('Response');
    return deferred.promise;
  };

  service.setCurrentDashboard = function(scope) {

  };

  return service;
}

