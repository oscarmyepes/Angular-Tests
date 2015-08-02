/* controller.js - Grid Widget */

/**
* @desc Grid widget controller
* @param vm.chartConfig - Call Chart service and get dataSet (data configuration) to Chart's render
*/

(function() {
  'use strict';

  angular
  .module('xtiva.widget.grid')
  .controller('GridController', GridController);

  GridController.$inject = ['data', '$scope', 'dashboardService','wGridService', 'eventHandlerService'];

  function GridController(data, $scope, dashboardService, gridService, eventHandlerService) {

    var vm = this;
    var wdid = $scope.model.wdid;

    vm.data = data;
    vm.getDefinition = getDefinition;
    vm.getDataSet = getDataSet;
    vm.onCellClick = onCellClick;

    activate();

    function activate() {
      //launch getDefinition to get widget definition immediately is instanced the widget
      vm.getDefinition();

    }


    function getDefinition() {
      return dashboardService.getWidgetDefinition(wdid).then(function(data){
        vm.widgetDescriptor = gridService.parseWidgetJSON(data);
        vm.getDataSet(vm.widgetDescriptor);
        console.info('Success');
      }, function(eror){
        console.info('Error');
      });
    }


    function getDataSet(widgetDescriptor) {
      gridService.getData(widgetDescriptor.query).then(function(data){
        vm.data = data;
      });
    }


    //Handler to the context menu click event
    function onCellClick(row, col) {
      eventHandlerService.sendEvent('masterChange'+$scope.model.wid, {});
    }

    //Events subscription
    eventHandlerService.subscribeToEvent($scope, callback);
    function callback () {
      console.log('grid: Callback to' + $scope.model.wid);
    }
  }

})();
