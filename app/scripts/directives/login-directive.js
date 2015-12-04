'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:loginDirective
 * @description
 * # loginDirective
 */
angular.module('registrationApp')
  .directive('loginDirective', function () {
    return {
      templateUrl: '/views/templates/login.tpl.html',
      restrict: 'E'
    };
  });
