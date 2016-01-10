'use strict';

/**
 * @ngdoc service
 * @name registrationApp.service
 * @description
 * # service
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('service', function ($q) {

  return {
    getAllServices : function() {
      var q = $q.defer();

      Parse.Cloud.run('getAllServices').then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },

    updateAllServices : function(services) {
      var q = $q.defer();

      Parse.Cloud.run('updateServices', {services: services}).then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },
    
    removeService : function(id) {
      var q = $q.defer();

      Parse.Cloud.run('removeService', {id: id}).then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    }
  }
});
