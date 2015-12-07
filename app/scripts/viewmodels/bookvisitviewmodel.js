'use strict';

/**
 * @ngdoc service
 * @name registrationApp.bookVisitViewModel
 * @description
 * # bookVisitViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('bookVisitViewModel', function (loginViewModel) {

  var BookVisitAPI = function() {};

  BookVisitAPI.prototype.isLoggedIn = function() {
    return loginViewModel.isLoggedIn();
  };
  
  return new BookVisitAPI();
  
});
