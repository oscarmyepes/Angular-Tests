'use strict';

angular.module('xtiva.widget.grid')
.directive('xtivaGrid', [
    '$compile', '$timeout', '$filter', 'wGridService', '$q', '$templateCache',
    function($compile, $timeout, $filter, wGridService, $q, $templateCache) {
  return {
    restrict: 'A',
    templateUrl: 'components/widgets/grid/partials/grid.html',
    scope: {
      data: '=xtivaGrid',
      cellClickHandler: "=cellClickHandler"
    },
    controller:  function ($scope, $element) {
    },
    link: function postLink(scope, element, attrs) {

      scope.menuOpc = [
        {name: 'Item 1'},
        {name: 'Item 2'},
        {name: 'Item 3'},
        {name: 'Item 4'},
        {name: 'Item 5'},
        {name: 'Item 6'},
      ];

      scope.gridOptions = {
        infiniteScrollRowsFromEnd: 40,
        infiniteScrollUp: true,
        infiniteScrollDown: true,
        columnDefs: [
          { name:' '}
        ],
        data: 'data',
        onRegisterApi: function(gridApi){
          gridApi.infiniteScroll.on.needLoadMoreData(scope, scope.getDataDown);
          gridApi.infiniteScroll.on.needLoadMoreDataTop(scope, scope.getDataUp);
          scope.gridApi = gridApi;
        }
      };

      scope.firstPage = 2;
      scope.lastPage = 2;

      function configureGrid(columnsDefs) {
        scope.gridOptions.columnDefs = columnsDefs;
      }

      //Click handlers
      scope.onCellClick = function(row, col){
        scope.cellClickHandler(row, col);
      };

      scope.getFirstData = function() {
        var promise = $q.defer();
        var newData = scope.getPage(scope.data, scope.lastPage);
        var columnKeys = _.keys(scope.data[0]);
        var colDefs = [];
        _.each(columnKeys, function(item){
          colDefs.push({ name:item
            , cellTemplate: $templateCache.get('context-menu.html')
          });
        });
        configureGrid(colDefs);
        promise.resolve();


        return promise.promise;
      };

      scope.getDataDown = function() {
        var promise = $q.defer();
        wGridService.getData('', function(data) {
          scope.lastPage++;
          var newData = scope.getPage(data, scope.lastPage);
          scope.gridApi.infiniteScroll.saveScrollPercentage();
          scope.data = scope.data.concat(newData);
          scope.gridApi.infiniteScroll.dataLoaded(scope.firstPage > 0, scope.lastPage < 4).then(function() {scope.checkDataLength('up');}).then(function() {
            promise.resolve();
          });
        });


        return promise.promise;
      };

      scope.getDataUp = function() {
        var promise = $q.defer();
        wGridService.getData('', function(data) {
          scope.firstPage--;
          var newData = scope.getPage(data, scope.firstPage);
          scope.gridApi.infiniteScroll.saveScrollPercentage();
          scope.data = newData.concat(scope.data);
          scope.gridApi.infiniteScroll.dataLoaded(scope.firstPage > 0, scope.lastPage < 4).then(function() {scope.checkDataLength('down');}).then(function() {
            promise.resolve();
          });
        });
        return promise.promise;
      };


      scope.getPage = function(data, page) {
        var res = [];
        for (var i = (page * 100); i < (page + 1) * 100 && i < data.length; ++i) {
          res.push(data[i]);
        }
        return res;
      };

      scope.checkDataLength = function( discardDirection) {
        // work out whether we need to discard a page, if so discard from the direction passed in
        if( scope.lastPage - scope.firstPage > 3 ){
          // we want to remove a page
          scope.gridApi.infiniteScroll.saveScrollPercentage();

          if( discardDirection === 'up' ){
            scope.data = scope.data.slice(100);
            scope.firstPage++;
            $timeout(function() {
              // wait for grid to ingest data changes
              scope.gridApi.infiniteScroll.dataRemovedTop(scope.firstPage > 0, scope.lastPage < 4);
            });
          } else {
            scope.data = scope.data.slice(0, 400);
            scope.lastPage--;
            $timeout(function() {
              // wait for grid to ingest data changes
              scope.gridApi.infiniteScroll.dataRemovedBottom(scope.firstPage > 0, scope.lastPage < 4);
            });
          }
        }
      };

      scope.reset = function() {
        scope.firstPage = 2;
        scope.lastPage = 2;

        // turn off the infinite scroll handling up and down - hopefully this won't be needed after @swalters scrolling changes
        scope.gridApi.infiniteScroll.setScrollDirections( false, false );
        scope.data = [];

        scope.getFirstData().then(function(){
          $timeout(function() {
            // timeout needed to allow digest cycle to complete,and grid to finish ingesting the data
            scope.gridApi.infiniteScroll.resetScroll( scope.firstPage > 0, scope.lastPage < 4 );
          });
        });
      };

      scope.getFirstData().then(function(){
        $timeout(function() {
          // timeout needed to allow digest cycle to complete,and grid to finish ingesting the data
          // you need to call resetData once you've loaded your data if you want to enable scroll up,
          // it adjusts the scroll position down one pixel so that we can generate scroll up events
          scope.gridApi.infiniteScroll.resetScroll( scope.firstPage > 0, scope.lastPage < 4 );
        });
      });
    }
  };
}]);

