'use strict';

describe('Service: navMenu', function () {

  // load the service's module
  beforeEach(module('xtivaApp'));

  // instantiate service
  var navMenuService
    , verifyAfterEachRestCall
    , httpBackend
    , restFactory
    , appSettings
    , tabsService;

  beforeEach(inject(function (_navMenuService_, _$httpBackend_, _appSettings_, _tabsService_) {
    httpBackend = _$httpBackend_;
    appSettings = _appSettings_;
    navMenuService = _navMenuService_;
    tabsService = _tabsService_;
    //Service dependencies mocks
    restFactory = new mock.restFactory(httpBackend, appSettings);
  }));

  verifyAfterEachRestCall = function() {
    httpBackend.flush();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  };

  it('getDashboardsList Function', function () {
    //Assemble
    restFactory.confGet(appSettings.apiServiceBaseUri + appSettings.dashboardUrl);
    //Act
    var returned = navMenuService.getDashboardsList();
    //Assert

    //Verify
    httpBackend.expectGET(appSettings.apiServiceBaseUri + appSettings.dashboardUrl);
    verifyAfterEachRestCall();
  });

  it('getDashboardsList Function Error', function () {
    //Assemble
    restFactory.confGetError(appSettings.apiServiceBaseUri + appSettings.dashboardUrl);
    //Act
    var returned = navMenuService.getDashboardsList();
    //Assert

    //Verify
    httpBackend.expectGET(appSettings.apiServiceBaseUri + appSettings.dashboardUrl);
    verifyAfterEachRestCall();
  });

  it('loadDashboard Function', function () {
    //Assemble
    spyOn(tabsService, "loadDashboard").andCallFake(function(item) {});
    var item = {did : 1};

    //Act
    navMenuService.loadDashboard(item);
    //Assert

    //Verify
    expect(tabsService.loadDashboard).toHaveBeenCalledWith(item);

  });
});
