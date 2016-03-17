'use strict';

/**
 * @ngdoc service
 * @name registrationApp.popup
 * @description
 * # popup
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('popup', function (modal) {

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

      var modalInstance = modal.open(null, templateUrl, templateCtrl, null, element);

      /*modalInstance.result.then( function(selectedItem) {
        console.debug(selectedItem);
      }, function() {
        console.info('Modal dismissed');
      });*/
      return modalInstance;
    },
    
    cancel: function() {
      modal.cancel();
    }
  };


});
