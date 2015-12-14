'use strict';

/**
 * @ngdoc service
 * @name registrationApp.registerViewModel
 * @description
 * # registerViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('registerViewModel', function ($state, user) {

  var RegisterAPI = function() {};
  
  RegisterAPI.prototype.isSubmitted = false;

  RegisterAPI.prototype.signUp = function(form) {
    var self = this;
    
    if (form) {
      user.signUp(form).then(function(user) {
        self.goToLoginPage();
      }, function(error) {
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
            self.formError = 'Error occured. Please try again.';
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
