'use strict';

/**
 * @ngdoc service
 * @name registrationApp.profileViewModel
 * @description
 * # profileViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('profileViewModel', function (user) {

  var ProfileAPI = function() {};

  ProfileAPI.prototype.firstName = function() {
    return user.userFirstName;
  };

  return ProfileAPI();

});