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
      // $window.location.href = '/'; //to refresh page
      $state.go('home', {}, { 'reload': true });
    });
  };

  HeaderAPI.prototype.name = function() {
    return user.userFirstName();
  }

  HeaderAPI.prototype.isAdmin = false;

  HeaderAPI.prototype.checkIfAdmin = function() {
    var self = this;

    user.isAdmin().then(function(result) {
      self.isAdmin = result;
    });
  };

  return new HeaderAPI();

});
