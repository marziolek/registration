'use strict';

/**
 * @ngdoc service
 * @name registrationApp.headerViewModel
 * @description
 * # headerViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('headerViewModel', function (user, $state, loading) {

  var HeaderAPI = function() {};

  HeaderAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };

  HeaderAPI.prototype.logOut = function() {
    loading.set();
    user.logOut().then( function() {
      loading.unset();
      $state.go('home', {}, { 'reload': true });
    });
  };

  HeaderAPI.prototype.name = function() {
    return user.userFirstName();
  };

  HeaderAPI.prototype.isAdmin = false;

  HeaderAPI.prototype.checkIfAdmin = function() {
    var self = this;

    loading.set();
    user.isAdmin().then(function(result) {
      loading.unset();
      self.isAdmin = result;
    });
  };

  return new HeaderAPI();

});
