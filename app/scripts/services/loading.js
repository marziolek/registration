'use strict';

/**
 * @ngdoc service
 * @name registrationApp.loading
 * @description
 * # loading
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('loading', function ($rootScope, $timeout) {

  return {
    set: function() {
      $rootScope.isLoading = true;
    },
    unset: function() {
      $timeout( function() {
        $rootScope.isLoading = false;
      }, 1000);
    }
  };

});
