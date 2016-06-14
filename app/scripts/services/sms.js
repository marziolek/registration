'use strict';

/**
 * @ngdoc service
 * @name registrationApp.SMS
 * @description
 * # SMS
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('SMS', function ($q) {

  return {
    sendSMS : function(data) {
      var q = $q.defer();

      Parse.Cloud.run('sendSMS', {data: data}).then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    }
  };

});
