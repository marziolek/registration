'use strict';

/**
 * @ngdoc service
 * @name registrationApp.popup
 * @description
 * # popup
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('popup', function ($uibModal, currentUser) {

  return {
    show: function(templateName) {

      var templateUrl = '/views/templates/book.visit.tpl.html';

      if (templateName) {
        templateUrl = '/views/templates/' + templateName;
      }

      var open = function(size) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: templateUrl,
          size: size ? size : 'lg'
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
  } 
});
