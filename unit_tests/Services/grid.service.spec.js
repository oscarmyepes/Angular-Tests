'use strict';

describe('Service: wGridService', function () {

  // Load the controller's module
  beforeEach(module('xtivaApp'));
  beforeEach(module('xtiva.widget.grid'));

  //Variables definition
  var restFactory
    , appSettings
    , wGridService
    , httpBackend
    , verifyAfterEachRestCall;
  //Register components in the controller under tests
  // beforeEach(function () {
  //   module(function ($provide) {
  //     //$provide.value('restFactory', restFactory);
  //     //$provide.value('appSettings', appSettings);
  //   });
  // });

  //Initialize the controller, mock scope and services
  beforeEach(inject(function (_$httpBackend_, _wGridService_, _appSettings_) {
    httpBackend = _$httpBackend_;
    wGridService = _wGridService_;
    appSettings = _appSettings_
    //Service dependencies mocks
    restFactory = new mock.restFactory(httpBackend, appSettings);

  }));

  verifyAfterEachRestCall = function() {
    httpBackend.flush();
   httpBackend.verifyNoOutstandingExpectation();
   httpBackend.verifyNoOutstandingRequest();
 };

  //Tests
  it('getData Function', function () {

    //Assemble
    restFactory.confGet(appSettings.apiServiceBaseUri + appSettings.widgetUrl, ['2']);
    //Act
    var returned = wGridService.getData({});
    //Assert

    //Verify
    httpBackend.expectGET(appSettings.apiServiceBaseUri + appSettings.widgetUrl + '/2');
    verifyAfterEachRestCall();

  });

  it('getData Function Error', function () {

    //Assemble
    restFactory.confGetError(appSettings.apiServiceBaseUri + appSettings.widgetUrl, ['2']);
    //Act
    var returned = wGridService.getData({});
    //Assert

    //Verify
    httpBackend.expectGET(appSettings.apiServiceBaseUri + appSettings.widgetUrl + '/2');
    verifyAfterEachRestCall();

  });


    it('parseWidgetDefinition Function', function () {

      //Assemble

      //Act
      var returned = wGridService.parseWidgetDefinition({});
      //Assert

      //Verify

    });



});
