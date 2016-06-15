'use strict';

/**
 * @ngdoc service
 * @name registrationApp.registerViewModel
 * @description
 * # registerViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('registerViewModel', function ($state, user, loading) {

  var RegisterAPI = function() {};
  
  RegisterAPI.prototype.isSubmitted = false;

  RegisterAPI.prototype.signUp = function(form) {
    var self = this;
    
    if (form) {
      loading.set();
      user.signUp(form).then(function(res) {
        loading.unset();
        if (res) {
          self.goToLoginPage();
        } else {
          self.formError = 'Ten email jest już zajęty';
        }
      }, function(error) {
        loading.unset();
        switch(error.code) {
          case 142:
            self.formError = error.message;
            break;
          case -1:
            self.formError = error.message;
            break;
          case 202: 
            self.formError = error.message.substring(8); 
            break;
          default: 
            self.formError = 'Wystąpił błąd. Spróbuj jeszcze raz.';
            break;
        }
      });
    }
  };

  RegisterAPI.prototype.goToLoginPage = function() {
    $state.go('login');
  };

  return new RegisterAPI();
});
