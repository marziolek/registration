'use strict';

/**
 * @ngdoc service
 * @name registrationApp.day
 * @description
 * # day
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('day', function ($q) {

  return {
     updateAllWH : function(wh) {
      var q = $q.defer();

      Parse.Cloud.run('updateAllWH', {wh: wh}).then( function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    }
  }

});
