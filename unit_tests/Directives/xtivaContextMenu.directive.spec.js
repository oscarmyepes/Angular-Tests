'use strict';

describe('Directive: xtivaContextMenu', function () {

  // load the directive's module
  beforeEach(module('xtiva-context-menu'));

  var element
    , widgetParent
    , scope
    , contextMenuService
    , $document
    , $compile
    , _$rootScope;

  beforeEach(inject(function ($rootScope, _$compile_, _contextMenuService_, _$document_) {
    $compile = _$compile_;
    _$rootScope = $rootScope;
    scope = _$rootScope.$new();
    contextMenuService = _contextMenuService_;
    $document = _$document_;

    element = angular.element('<div context-menu="menuOpc" context-menu-disabled="false" data-target="menu-1"></div>');
    widgetParent = angular.element('<div id="menu-uiGrid-00NuiGrid-00B"></div>');
    $compile(element)(scope);
  }));

  it('contextmenu Function Menu opened', function () {
    //Assemble
    spyOn(angular, 'element').andCallFake(function() {return  widgetParent});
    //Model passed to the directive isolated scope
    element.isolateScope().contextMenu = ['Item 1'];
    //Act
    element.triggerHandler('contextmenu');
    var returned = contextMenuService.menuElement;

    //Assert
    expect(returned.hasClass('open')).toBeTruthy();
    expect(contextMenuService.element).toEqual(element['0']);
    expect(parseInt(returned.css('top'), 10)).toBeGreaterThan(0);
  });

  //Test to check if the context menu does not fit in the screen must be placed in the top of the element
  it('contextmenu  Function many records', function () {
    //Assemble
    spyOn(angular, 'element').andCallFake(function() {return  widgetParent});
    element.isolateScope().contextMenu = function() {
      var items = [];
      for (var i = 0; i<20; i++) {
        items.push('Item' + i);
      }
      return items;
    }();
    //Act
    element.triggerHandler('contextmenu');
    var returned = contextMenuService.menuElement;

    //Assert
    expect(returned.hasClass('open')).toBeTruthy();
    expect(contextMenuService.element).toEqual(element['0']);
    expect(parseInt(returned.css('top'), 10)).toBeLessThan(0);

  });

  it('close previous before open current Function', function () {
    //Assemble
    //To open a context menu and then check that the close function it is been called when open the second
    element.isolateScope().contextMenu = ['Item 1', 'Item 2'];
    element.triggerHandler('contextmenu');

    var element2 = angular.element('<div context-menu="menuOpc" data-target="menu-2"></div>');

    spyOn(angular, 'element').andCallFake(function() {return  widgetParent});

    //Act
    $compile(element2)(_$rootScope.$new());
    element2.isolateScope().contextMenu = ['Item 1'];
    element2.triggerHandler('contextmenu');
    var returned = contextMenuService.menuElement;

    //Assert
    expect(returned.hasClass('open')).toBeTruthy();
    expect(contextMenuService.element).toEqual(element2['0']);


  });

  it('handleKeyUpEvent bind Function', function () {
    //Assemble
    spyOn(angular, 'element').andCallFake(function() {return  widgetParent});
    element.isolateScope().disabled = function() {return false;};
    element.isolateScope().contextMenu = ['Item 1', 'Item 2'];
    //Act
    element.triggerHandler('contextmenu');
    $document.triggerHandler({
                                          type : "keyup",
                                          keyCode: 27
                                        });


    var returned = contextMenuService.menuElement;

    //Assert
    expect(returned.hasClass('open')).toBeFalsy();

  });

  it('handleClickEvent  Function', function () {
    //Assemble
    spyOn(angular, 'element').andCallFake(function() {return  widgetParent});
    element.isolateScope().disabled = function() {return false;};
    element.isolateScope().contextMenu = ['Item 1', 'Item 2'];
    //Act
    element.triggerHandler('contextmenu');
    $document.triggerHandler({type : "click"
                                          ,button: 1
                                          , target: {}
                                          });

    var returned = contextMenuService.menuElement;

    //Assert
    expect(returned.hasClass('open')).toBeFalsy();

  });


  it('scope on destroy  Function', function () {
    //Assemble
    spyOn(angular, 'element').andCallFake(function() {return  widgetParent});
    spyOn($document, 'unbind').andCallThrough();
    element.isolateScope().contextMenu = ['Item 1', 'Item 2'];
    //Act
    scope.$destroy();

    //Assert
    expect($document.unbind.callCount).toBe(3);
  });


});
