'use strict';

/**
 * @ngdoc service
 * @name registrationApp.resendVerificationEmailViewModel
 * @description
 * # resendVerificationEmailViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('resendVerificationEmailViewModel', function (user) {

  var ResendVerificationEmailAPI = function() {};
  
  ResendVerificationEmailAPI.prototype.resendVerificationEmail = function(email) {
    user.resendVerificationEmail({username: email}).then( function(result) {
      console.log(result);
    })
  };
  
  return new ResendVerificationEmailAPI();
});
