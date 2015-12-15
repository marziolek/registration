'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminViewModel
 * @description
 * # adminViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminViewModel', function (user, calendar, settings) {

  var AdminAPI = function() {};

  AdminAPI.prototype.isAdmin = false;
  AdminAPI.prototype.checkIfAdmin = function() {
    var self = this;

    user.isAdmin().then( function(result) {
      self.isAdmin = result;
    });
  };
  
  AdminAPI.prototype.weeksAvailable;
  AdminAPI.prototype.getWeeksAvailable = function() {
    var self = this;
    
    settings.weeksAvailable().then( function(result) {
      self.weeksAvailable = result.attributes.duration;
    });
  };
  
  AdminAPI.prototype.updateWeeksAvailable = function(value) {
    settings.updateWeeksAvailable(value).then( function(result) {
      console.log(result);
    });
  }
  
  return new AdminAPI();

});