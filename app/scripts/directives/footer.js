'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:footerMain
 * @description
 * # footerMain
 */
angular.module('registrationApp')
  .directive('footerMain', function () {
  
  return {
    templateUrl: 'views/templates/footer.main.tpl.html',
    restrict: 'E'
  };
});