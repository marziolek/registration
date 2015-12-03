'use strict';

/**
 * @ngdoc service
 * @name registrationApp.currentUser
 * @description
 * # currentUser
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('currentUser', function ($cookies, $log) {

  return {
    get: function() {
      return $cookies.getObject('currentRegistrationUser');    
    }, 
    set: function() {
      var user = {
        username: 'anna.kowalska',
        name: 'Anna',
        lastname: 'Kowalska'
      };
      $cookies.putObject('currentRegistrationUser', user);
    }
  }
});
