'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('ProfileCtrl', function ($scope, profileViewModel) {

  $scope.vm = profileViewModel;
  
  $scope.vm.getMyVisits();
});
