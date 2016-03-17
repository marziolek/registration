'use strict';

/**
 * @ngdoc service
 * @name registrationApp.modal
 * @description
 * # modal
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('modal', function ($uibModal, $uibModalStack) {

  return {
    open: function(size, template, controller, params, element) {
      return $uibModal.open({
        animation: true,
        templateUrl: template,
        controller: controller,
        size: size ? size : 'lg',
        resolve: {
          params: function() {
            return params;
          },
          element: function() {
            return element;
          }
        }
      });
    },
    cancel: function() {
      $uibModalStack.dismissAll();
    }
  };
});
