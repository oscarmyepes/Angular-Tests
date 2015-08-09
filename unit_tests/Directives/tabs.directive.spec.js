'use strict';

describe('Directive: xtivaTabs', function () {

  beforeEach(module('adf'));
  beforeEach(module('xtiva.component.tabs'));
  beforeEach(module('components/tabs/tabs.html'));

  var scope
    , $compile
    , element
    , httpBackend
    , tabsService
    , $filter;

    // Register dependencies
    beforeEach(function () {
      module(function ($provide) {
        $provide.value('tabsService', new mock.tabsService());
      });
    });

  beforeEach(inject(function ($rootScope, $templateCache, _$compile_, _$httpBackend_, _tabsService_, _$filter_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
    httpBackend = _$httpBackend_;
    $filter = _$filter_;

    //The directive instantiates a dashboard controller thats why we need to mock the http requests
    httpBackend.whenGET('components/dashboard/templates/dashboard.html').respond(200, '');
    httpBackend.whenGET('components/dashboard/templates/dashboard-row.html').respond(200, '');
    httpBackend.whenGET('http://localhost:8081/api/metadata/library/dashboard/1').respond(200, '');
    httpBackend.whenGET('http://localhost:8081/api/metadata/library/dashboard/2').respond(200, '');

    tabsService = _tabsService_;

    element = angular.element('<xtiva-tabs></xtiva-tabs>');
    $compile(element)(scope);

  }));

  it('link Function Select Tab Dashboard 1 Opened', function () {
    //Assemble
    var expectedCurrentDashboard = {did: 1};
    var dasboardsOpened = [{did: 1}, {did: 2}];
    //Mock the calls to the opened dashboards
    tabsService.currentDashboard = expectedCurrentDashboard;
    tabsService.dasboardsOpened = dasboardsOpened;

    //Act
    scope.$digest();

    //Assert
    var currDashboardShow = findCurrDash(dasboardsOpened);
    expect(angular.equals(currDashboardShow.did, expectedCurrentDashboard.did)).toBeTruthy();

    //Verify
  });

  it('link Function Select Tab Dashboard 2 Opened', function () {
    //Assemble
    var expectedCurrentDashboard = {did: 2};
    var dasboardsOpened = [{did: 1}, {did: 2}];
    //Mock the calls to the opened dashboards
    tabsService.currentDashboard = expectedCurrentDashboard;
    tabsService.dasboardsOpened = dasboardsOpened;

    //Act
    scope.$digest();

    //Assert
    var currDashboardShow = findCurrDash(dasboardsOpened);
    expect(angular.equals(currDashboardShow.did, expectedCurrentDashboard.did)).toBeTruthy();

    //Verify
  });

  it('link Function switchTab', function () {
    //Assemble
    var expectedCurrentDashboard = {did: 2};
    var dasboardsOpened = [{did: 1}, {did: 2}];
    //Mock the calls to the opened dashboards
    tabsService.currentDashboard = expectedCurrentDashboard;
    tabsService.dasboardsOpened = dasboardsOpened;

    //Act
    scope.$digest();
    scope.switchTab({did: 2});


    //Assert
    var currDashboardShow = findCurrDash(dasboardsOpened);
    expect(angular.equals(currDashboardShow.did, expectedCurrentDashboard.did)).toBeTruthy();

    //Verify
  });


  it('link Function removeTab', function () {
    //Assemble
    var expectedCurrentDashboard = {did: 1};
    var dasboardsOpened = [{did: 1}, {did: 2}];
    //Mock the calls to the opened dashboards
    tabsService.currentDashboard = expectedCurrentDashboard;
    tabsService.dasboardsOpened = dasboardsOpened;
    spyOn(tabsService, 'removeDashboardOpened').andCallThrough();
    //Act
    scope.$digest();
    scope.removeTab({did: 2});
    //Assert
    var currDashboardShow = findCurrDash(dasboardsOpened);
    expect(angular.equals(currDashboardShow.did, expectedCurrentDashboard.did)).toBeTruthy();

    //Verify
    expect(tabsService.removeDashboardOpened).toHaveBeenCalled();

  });

  function findCurrDash(dasboardsOpened) {
    var currDash =  $filter('filter')(dasboardsOpened, function(item) {
      return item.show == true;
    });
    return currDash[0];
  }

});
