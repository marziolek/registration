'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminPatientsViewModel
 * @description
 * # adminPatientsViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminPatientsViewModel', function (user) {

  var AdminPatientsAPI = function() {};

  AdminPatientsAPI.prototype.allPatients = [];
  AdminPatientsAPI.prototype.getAllPacients = function() {
    var self = this;
    
    user.getAllPatients().then( function(result) {
      self.allPatients = result;
    });
  };
  
  return new AdminPatientsAPI();
  
});
