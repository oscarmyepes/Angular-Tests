/* dashboardService.service.js - Dashboard Service */

/**
* @desc Here is where get Dashboard's Data, Widget Definition
* @param currentDashboard = Get the Dashboard active in the view (tab actived)
*/


(function() {
  'use strict';

  angular
  .module('xtivaApp')
  .service('dashboardService', dashboardService);

  dashboardService.$inject = ['restFactory', 'appSettings'];

  function dashboardService(restFactory, appSettings) {

    /*VARIABLES*/
    var currentDashboard = {};
    var dashboards;

    /*METHODS DEFINITION*/
    this.getData = getData;
    this.getCurrentDashboard = getCurrentDashboard;
    this.getWidgetDefinition = getWidgetDefinition;
    this.setCurrentDashboard = setCurrentDashboard;

    /*METHODS*/
    function getData(dashboardId, callback) {
      return restFactory.show({url: appSettings.dashboardUrl, id: dashboardId})
      .$promise.then(success,error);

      function success(response) {
        return response;
      }

      function error(error) {
        console.log('Error');
      }
    }

    function getCurrentDashboard() {
      return currentDashboard;
    }

    function setCurrentDashboard(scope) {
      currentDashboard = scope;
    }

    function getWidgetDefinition(wdid, callback) {
      return restFactory.show({url: appSettings.widgetUrl, id: wdid})
      .$promise.then(success, error);

      function success(response) {
        return response;
      }

      function error(error) {
        console.log('Error');
      }
    }

}
})();
