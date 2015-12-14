'use strict';

/**
 * @ngdoc service
 * @name registrationApp.bookVisitViewModel
 * @description
 * # bookVisitViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('bookVisitViewModel', function (user) {

  var BookVisitAPI = function() {};

  BookVisitAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };
  
  return new BookVisitAPI();
  
});
