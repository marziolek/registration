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
      if (result) {
        user.logIn(form.email, form.password).then(function(result) {
          self.errorMessage = false;
          user.userData();
          self.goToCalendar();
        }, function(error) {
          var errorFirstLetterUppercase = error.substr(0, 1).toUpperCase() + error.substr(1);
          self.errorMessage = errorFirstLetterUppercase;
        });
      } else {
        self.errorMessage = false;
        self.toggleVerified = true;
      }
    }, function(error) {
      console.log(error);
      self.errorMessage = 'No such user';
      self.toggleVerified = false;
    });
  };
  
  LoginAPI.prototype.isLoggedIn = user.isLoggedIn();

  LoginAPI.prototype.goToCalendar = function() {
    $state.go('home');
  };

  return new LoginAPI();
});
