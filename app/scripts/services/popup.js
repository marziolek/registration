'use strict';

/**
 * @ngdoc service
 * @name registrationApp.popup
 * @description
 * # popup
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('popup', function ($uibModal) {

  return {
    show: function(templateName, popupController, element) {

      var templateUrl = 'views/templates/book.visit.tpl.html';
      var templateCtrl = 'MainCtrl';

      if (templateName) {
        templateUrl = 'views/templates/' + templateName;
      }

      if (popupController) {
        templateCtrl = popupController;
      }
      
      var open = function(size) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: templateUrl,
          controller: popupController,
          size: size ? size : 'lg',
          resolve: {
            element: function() {
              return element;
            }
          }
        });

        /*
        modalInstance.result.then( function(selectedItem) {
          $log.debug(selectedItem);
        }, function() {
          $log.info('Modal dismissed');
        });
        */
      };
      open();
    }
  };

});
