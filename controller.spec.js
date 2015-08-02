'use strict';

describe('Controller: GridController', function () {

  // Load the controller's module
  beforeEach(module('xtivaApp'));
  beforeEach(module('xtiva.widget.grid'));

  //Variables definition
  var $q
    , scope
    ,data
    , eventHandlerService
    , dashboardService
    , wGridService
    , createController;

  //Register components in the controller under tests
  beforeEach(function () {
    module(function ($provide) {
      $provide.value('data', data);
      $provide.value('eventHandlerService', eventHandlerService);
      $provide.value('dashboardService', dashboardService);
      $provide.value('wGridService', wGridService);
    });
  });

  //Initialize the controller, mock scope and services
  beforeEach(inject(function ($controller, $rootScope, _$q_) {
    //Scope mock
    scope = $rootScope.$new();
    scope.model = {};
    scope.model.wdid = 1;
    scope.model.config = {};
    scope.model.config.master = 1;
    //Injected variables initialization
    $q =  _$q_;

    //Controller dependencies mocks
    data = {};
    eventHandlerService = new mock.eventHandlerService($q);
    dashboardService = new mock.dashboardService($q);
    wGridService = new mock.wGridService($q);

    createController = function() {
      return $controller('GridController', {
        $scope: scope,
        data : data,
        eventHandlerService : eventHandlerService,
        dashboardService : dashboardService,
        wGridService : wGridService
      });
    };
  }));

  //Tests
  it('getDefinition Function', function () {
    //Assemble
    spyOn(dashboardService, 'getWidgetDefinition').andCallThrough();
    var expected = { $$state : { status : 1, value: undefined } };
    //Act
    var returned = createController().getDefinition();
    scope.$apply();

     //Assert
    expect(_.isEqual(returned, expected)).toBeTruthy();
    //Verify
    expect(dashboardService.getWidgetDefinition).toHaveBeenCalled();
  });

  it('getDataSet Function', function () {
    //Assemble
    var widgetDescriptor = {};
    spyOn(wGridService, 'getData').andCallThrough();
    //Act
    var returned = createController().getDataSet(widgetDescriptor);
    scope.$apply();
    //Assert
    expect(returned).toBeUndefined();
    //Verify
    expect(wGridService.getData).toHaveBeenCalled();

  });

  it('onCellClick Function', function () {
    //Assemble
    spyOn(eventHandlerService, 'sendEvent').andCallThrough();
    //Act
    var returned = createController().onCellClick();
    scope.$apply();
    //Assert
    expect(returned).toBeUndefined();
    //Verify
    expect(eventHandlerService.sendEvent).toHaveBeenCalled();
  });
});
