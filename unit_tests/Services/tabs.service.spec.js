'use strict';

describe('Service: tabsService', function () {

  // Load the controller's module
  beforeEach(module('adf'));
  beforeEach(module('xtiva.component.tabs'));

  //Variables definition
  var tabsService;

  //Initialize the controller, mock scope and services
  beforeEach(inject(function (_$httpBackend_, _tabsService_) {
    tabsService = _tabsService_;

  }));

  //Tests
  it('loadDashboard Function - No previus dashboard opened', function () {

    //Assemble
    var dashboard = {did : 1};

    //Act
    tabsService.loadDashboard(dashboard);

    //Assert
    expect(tabsService.currentDashboard).toEqual(dashboard);
    expect(tabsService.dasboardsOpened.length).toEqual(1);
    //Verify

  });

  it('loadDashboard Function - One previus dashboard opened', function () {

    //Assemble
    var dashboard = {did : 2};
    tabsService.dasboardsOpened = [{did : 1}];

    //Act
    tabsService.loadDashboard(dashboard);

    //Assert
    expect(tabsService.currentDashboard).toEqual(dashboard);
    expect(tabsService.dasboardsOpened.length).toEqual(2);

    //Verify

  });

  it('removeDashboardOpened Function - One previus dashboard opened', function () {

    //Assemble
    var dashboard = {did : 1};
    tabsService.dasboardsOpened = [{did : 1}];

    //Act
    tabsService.removeDashboardOpened(dashboard);

    //Assert
    expect(tabsService.currentDashboard).toEqual(undefined);
    expect(tabsService.dasboardsOpened.length).toEqual(0);

    //Verify

  });


  //Check when removing the first dashboard then the second dashboard is now the current selected
  it('removeDashboardOpened Function - Two previus dashboard opened', function () {

    //Assemble
    var dashboard1 = {did : 1};
    var dashboard2 = {did : 2};
    tabsService.dasboardsOpened = [dashboard1, dashboard2];

    //Act
    tabsService.removeDashboardOpened(dashboard1);

    //Assert
    expect(tabsService.currentDashboard).toEqual(dashboard2);
    expect(tabsService.dasboardsOpened.length).toEqual(1);

    //Verify

  });

  //Check when removing the last dashboard then next to last dashboard is now the current selected
  it('removeDashboardOpened Function - Two previus dashboard opened', function () {

    //Assemble
    var dashboard1 = {did : 1};
    var dashboard2 = {did : 2};
    var dashboard3 = {did : 3};
    tabsService.dasboardsOpened = [dashboard1, dashboard2, dashboard3];

    //Act
    tabsService.removeDashboardOpened(dashboard3);

    //Assert
    expect(tabsService.currentDashboard).toEqual(dashboard2);
    expect(tabsService.dasboardsOpened.length).toEqual(2);

    //Verify

  });

});
