(function() {
  'use strict';

  angular
    .module('xtiva-context-menu')
    .factory('contextMenuService', contextMenuService);

  function contextMenuService() {
    return {
      element: null,
      menuElement: null
    };
  }

})();
