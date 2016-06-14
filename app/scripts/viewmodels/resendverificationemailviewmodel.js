'use strict';

/**
 * @ngdoc service
 * @name registrationApp.resendVerificationEmailViewModel
 * @description
 * # resendVerificationEmailViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('resendVerificationEmailViewModel', function (user, loading) {

  var ResendVerificationEmailAPI = function() {};

  ResendVerificationEmailAPI.prototype.response = {status: '', msg: ''};
  ResendVerificationEmailAPI.prototype.resendVerificationEmail = function(email) {
    var self = this;

    loading.set();
    user.resendVerificationEmail({email: email}).then( function(result) {
      loading.unset();
      if (result.accepted.length > 0) {
        self.response.status = 'success';
        self.response.msg = 'Proszę sprawdzić skrzynkę pocztową adresu: ' + email;
      } else if (result.rejected.length > 0) {
        self.response.status = 'error';
        self.response.msg = 'Email NIE został dostarczony!';
      } else {
        self.response.status = 'warning';
        self.response.msg = 'Coś poszło nie tak... Spróbuj ponownie.';
      }
    });
  };

  return new ResendVerificationEmailAPI();
});
