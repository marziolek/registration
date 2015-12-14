'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:headerMain
 * @description
 * # headerMain
 */
angular.module('registrationApp')
  .directive('headerMain', function (headerViewModel) {
  
  return {
    templateUrl: 'views/templates/header.main.tpl.html',
    restrict: 'E',
    link: function postLink(scope) {
      scope.vm = headerViewModel;
      scope.vm.isLoggedIn();
    }
  };
});
