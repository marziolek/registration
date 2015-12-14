'use strict';

/**
 * @ngdoc service
 * @name registrationApp.headerViewModel
 * @description
 * # headerViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('headerViewModel', function (user, $state) {

  var HeaderAPI = function() {};

  HeaderAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };
  
  HeaderAPI.prototype.logOut = function() {
    user.logOut().then( function() {
      $state.go('home');
    });
  };
  
  HeaderAPI.prototype.name = function() {
    return user.userFirstName();
  }

  return new HeaderAPI();

});
