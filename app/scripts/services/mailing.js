'use strict';

/**
 * @ngdoc service
 * @name registrationApp.mailing
 * @description
 * # mailing
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('Mailing', function ($q, user) {

  return {
    sendEmail : function(mailData) {
      var q = $q.defer();
      
      if (!mailData.email || mailData.email.length === 0) {
        mailData.email = user.userEmail();
      }

      Parse.Cloud.run('sendEmail', {mailData: mailData}).then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    }
  };
});
