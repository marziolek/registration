'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminPatientsViewModel
 * @description
 * # adminPatientsViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminPatientsViewModel', function (user, loading) {

  var AdminPatientsAPI = function() {};

  AdminPatientsAPI.prototype.allPatients = [];
  AdminPatientsAPI.prototype.getAllPacients = function() {
    var self = this;
    
    loading.set();
    user.getAllPatients().then( function(result) {
      loading.unset();
      self.allPatients = result;
    });
  };
  
  return new AdminPatientsAPI();
  
});
