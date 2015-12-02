'use strict';

/**
 * @ngdoc service
 * @name registrationApp.popup
 * @description
 * # popup
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('popup', function ($log, $uibModal) {

  var test = 'asdasdasd';

  return {
    show: function(templateUrl, animations) {

      if (!templateUrl) {
        var templateUrl = '/views/templates/default-modal-tpl.html';
      }
      
      if (!animations) {
        var animations = true;
      }

      var open = function(size) {
        var modalInstance = $uibModal.open({
          animation: animations,
          templateUrl: templateUrl,
          size: size
          /*resolve: {
        items: function() {
          return items;
        }
      }*/
        });

        modalInstance.result.then( function(selectedItem) {
          $log.debug(selectedItem);
        }, function() {
          $log.info('Modal dismissed');
        });
      };
      open();
    }
  } 
});
