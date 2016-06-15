'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:AdminPatientsCtrl
 * @description
 * # AdminPatientsCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('AdminPatientsCtrl', function ($scope, adminPatientsViewModel) {

  $scope.vm = adminPatientsViewModel;
  $scope.vm.getAllPacients();
  
});