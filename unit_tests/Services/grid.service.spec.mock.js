var mock = mock || {};

mock.wGridService = function ($q) {
  var service = {};

  service.parseWidgetJSON = function(definition) {
   return {};
  };

  service.getData = function (widgetQuery) {
      var deferred = $q.defer();
      deferred.resolve('Response');
      return deferred.promise;
    };
  return service;
}

