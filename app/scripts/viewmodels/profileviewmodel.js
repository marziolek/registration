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

  ProfileAPI.prototype.firstName = user.userFirstName();

  ProfileAPI.prototype.lastName = user.userLastName();

  ProfileAPI.prototype.phone = user.userPhone();

  ProfileAPI.prototype.email = user.userEmail();
  
  ProfileAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };

  ProfileAPI.prototype.textMessages = function() {
    return user.userIsTextMessages();
  };
  
  ProfileAPI.prototype.smsStatus = function() {
    console.log(user.userIsTextMessages());
  };

  ProfileAPI.prototype.updateTextMessages = function(textMessages) {
    return user.setTextMessages(textMessages);
  };

  return new ProfileAPI();

});