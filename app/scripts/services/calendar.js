'use strict';

/**
 * @ngdoc service
 * @name registrationApp.calendar
 * @description
 * # calendar
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('calendar', function ($q) {

  return {
    getSchedule: function() {
      var q = $q.defer();

      Parse.Cloud.run('getSchedule').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    }
  };

});