'use strict';

/**
 * @ngdoc service
 * @name registrationApp.auth
 * @description
 * # auth
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('auth', function ($cookies, $rootScope) {

  return {
    login: function() {
      var user = {
        username: 'anna.kowalska',
        name: 'Anna',
        lastname: 'Kowalska'
      };
      $cookies.putObject('currentRegistrationUser', user);
      this.isLoggedIn();
    },
    logout: function() {
      $cookies.remove('currentRegistrationUser');
      this.isLoggedIn();
    },
    isLoggedIn: function() {
      if ($cookies.getObject('currentRegistrationUser')) {
        $rootScope.isLoggedIn = true;
      } else {
        $rootScope.isLoggedIn = false;
      }
    }
  }
});
