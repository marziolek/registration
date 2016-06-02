'use strict';

/**
 * @ngdoc service
 * @name registrationApp.loginViewModel
 * @description
 * # loginViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('loginViewModel', function ($state, user) {

  var LoginAPI = function() {};

  LoginAPI.prototype.logIn = function(form) {
    var self = this;
    user.isVerified(form.email).then(function(result) {
      if (result.verified) {
        user.logIn(form.email, form.password).then(function(result) {
          self.errorMessage = false;
          user.userData();
          self.goToCalendar();
        }, function(error) {
          if (error === 'Invalid username/password.') {
            self.errorMessage = 'Zły email lub hasło';
          } else {
            self.errorMessage = 'Błąd. Spróbuj ponownie.';
          }
        });
      } else {
        self.errorMessage = false;
        self.toggleVerified = true;
        self.toggleVerifiedMsg = result.msg;
      }
    }, function(error) {
      self.errorMessage = 'Nie ma takiego użytkownika.';
      self.toggleVerified = false;
    });
  };

  LoginAPI.prototype.isLoggedIn = user.isLoggedIn();

  LoginAPI.prototype.goToCalendar = function() {
    $state.go('home');
  };

  LoginAPI.prototype.response = {status: '', msg: ''};
  LoginAPI.prototype.forgotPasswordEmail = function(email) {
    var self = this;

    user.resetPasswordEmail(email).then( function(result) {
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

  return new LoginAPI();
});
