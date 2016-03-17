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
    getAllVisits: function(startDate) {
      var q = $q.defer(),
          from = moment().startOf('day').toDate();

      if (startDate) {
        from = new Date(startDate);
      };
      
      Parse.Cloud.run('getAllVisits', {from : from}).then( function(result) {
        q.resolve(result);
        console.log(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    }
  }
});
