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
    bookVisit: function(data, email) {
      var q = $q.defer();

      Parse.Cloud.run('bookVisit', {data: data, email: email}).then( function(result) {
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
      }

      Parse.Cloud.run('getAllVisits', {from : from}).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },
    getUserFullname: function(userId) {
      var q = $q.defer();

      Parse.Cloud.run('getAllVisitsUserData', {userId : userId}).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });
      
      return q.promise;
    },
    getMyVisits: function(startDate) {
      var q = $q.defer(),
          from = moment().startOf('day').toDate();

      if (startDate) {
        from = new Date(startDate);
      }

      Parse.Cloud.run('getMyVisits', {from : from}).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },

    getAllBooked: function() {
      var q = $q.defer(),
          from = moment().startOf('day').toDate();

      Parse.Cloud.run('getAllBooked', {from : from}).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },

    cancelVisit: function(id) {
      var q = $q.defer();

      Parse.Cloud.run('cancelVisit', {id : id}).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },

    enableVisit: function(id) {
      var q = $q.defer();

      Parse.Cloud.run('enableVisit', {id : id}).then( function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },
  };
});
