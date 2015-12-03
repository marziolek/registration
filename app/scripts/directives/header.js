'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:headerMain
 * @description
 * # headerMain
 */
angular.module('registrationApp')
  .directive('headerMain', function (auth, $log) {

  return {
    templateUrl: 'views/templates/header.main.tpl.html',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      auth.isLoggedIn(); // init rootscope var

      scope.login = function() {
        auth.login();
      };
      
      scope.logout = function() {
        auth.logout();
      };
    }
  };
});
