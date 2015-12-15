'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminViewModel
 * @description
 * # adminViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminViewModel', function (user, calendar) {

  var AdminAPI = function() {};

  AdminAPI.prototype.isAdmin = false;
  AdminAPI.prototype.checkIfAdmin = function() {
    var self = this;

    user.isAdmin().then( function(result) {
      self.isAdmin = result;
    });
  };
    
  return new AdminAPI();

});