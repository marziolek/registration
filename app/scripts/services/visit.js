'use strict';

/**
 * @ngdoc service
 * @name registrationApp.visit
 * @description
 * # visit
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('visit', function ($q) {

  return {
    bookVisit: function(data) {
      var q = $q.defer();

      Parse.Cloud.run('bookVisit', data).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },
    getAllVisits: function(data) {
      var q = $q.defer();

      Parse.Cloud.run('getAllVisits', data).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    }
  }
});
