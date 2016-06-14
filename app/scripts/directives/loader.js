'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:loader
 * @description
 * # loader
 */
angular.module('registrationApp')
  .directive('loader', function () {

  return {
    restrict: 'AE',
    link: function postLink(rootScope, element) {
      rootScope.$watch('isLoading', function() {
        if (rootScope.isLoading) {
          element.removeClass('loaded').addClass('loading');
        } else {
          element.removeClass('loading').addClass('loaded');
        }
      });
    }
  };
});