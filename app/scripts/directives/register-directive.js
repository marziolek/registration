'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:registerDirective
 * @description
 * # registerDirective
 */
angular.module('registrationApp')
  .directive('registerDirective', function () {
    return {
      templateUrl: '/views/templates/register.tpl.html',
      restrict: 'E'
    };
  });
