/* service.js - Grid Widget */

/**
* @desc Here is where get the Grid's dataSet, through service REST
*/

(function() {
  'use strict';

  angular
    .module('xtiva.widget.grid')
    .service('wGridService', service);

  service.$inject = ['restFactory', 'appSettings'];

  function service(restFactory, appSettings) {

    /*METHODS DEFINITION*/
    this.getData = getData;
    this.parseWidgetJSON = parseWidgetJSON;
    this.parseWidgetDefinition = parseWidgetDefinition;
    //this.joinDataSetToDefinition = joinDataSetToDefinition;

    /*TODO: These lines is only for testing, please remove after*/
    var dataSet = [
    {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
    },
    {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
    },
    {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
    }
    ];

    /*METHODS*/
    function getData(widgetQuery) {
      return restFactory.show({ url: appSettings.widgetUrl + '/2' })
        .$promise.then(success, error);

      function success(response) {
        //return response.data;
        return dataSet;
      }

      function error(error) {
        console.log('Error');
      }
    }


    function parseWidgetJSON(definition) {

      var parsedObj = {};

      parsedObj.query = {};
      /*TODO: grid has not definition structure, widgetDefinition will be empty*/
      parsedObj.widgetDefinition = {};
      parsedObj.catalog = '';

      /*QUERY SCHEMA*/

      /*Sort*/
      parsedObj.query.Sort = [];
      angular.forEach(definition['Data Properties'].Sorting, function(value, key){
        parsedObj.query.Sort.push({
          'Field ID': value['Field ID'],
          'Order': value['Order']
        });
      });

      /*Group*/
      parsedObj.query.Group = [];
      angular.forEach(definition['Data Properties'].Rows, function(value, key){
        parsedObj.query.Group.push({
          'Field ID': value['Field ID']
        });
      });

      /*Values*/
      parsedObj.query.Values = [];
      angular.forEach(definition['Data Properties'].Values, function(value, key){
        parsedObj.query.Values.push({
          'Field ID': value['Field ID'],
          'Aggregation Type': value['Aggregation Type']
        });
      });

      /*get entity to concat with url service*/
      parsedObj.catalog = definition['Data Properties'].Catalog;

      /*parse Widget Definition*/
      //parsedObj.widgetDefinition = parseWidgetDefinition(definition, parsedObj);


      console.log("obj: ", parsedObj);

      return parsedObj;
    }

    function parseWidgetDefinition(definition, obj) {
      //TODO: parse JSON to get widget definition
    }


  }
})();
