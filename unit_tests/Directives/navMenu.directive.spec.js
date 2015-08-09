'use strict';

describe('Directive: navMenu', function () {

  // load the directive's module and view
  beforeEach(module('xtivaApp'));
  beforeEach(module('app/navMenu/navMenu.html'));

  var element
      , scope
      , $compile
      , httpBackend
      , navMenuService
      , $q;


      // Register dependencies
/*      beforeEach(function () {
        module(function ($provide) {
          $provide.value('navMenuService', navMenuService);
        });
      });*/

  beforeEach(inject(function ($rootScope, _$compile_, _$httpBackend_, _$q_, _navMenuService_ ) {
    scope = $rootScope.$new();
    $compile = _$compile_;
    httpBackend = _$httpBackend_;
    $q = _$q_;
    navMenuService = _navMenuService_;

    new mock.navMenuService(navMenuService, $q);

    httpBackend.whenGET('http://localhost:8081/api/metadata/library/dashboard').respond(200, '');

    element = angular.element('<nav-menu></nav-menu>');
    $compile(element)(scope);

  }));

  it('link Function', function () {
    //Assemble

    //Act
    scope.$digest();
    //Assert

    //Verify
    expect(navMenuService.getDashboardsList).toHaveBeenCalled();

  });

  it('loadDashboard Function', function () {
    //Assemble
    var item = {did: 1};

    //Act
    scope.$digest();
    scope.loadDashboard(item);
    //Assert

    //Verify
    expect(navMenuService.getDashboardsList).toHaveBeenCalled();
    expect(navMenuService.loadDashboard).toHaveBeenCalled();

  });

});
