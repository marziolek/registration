'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('RegisterCtrl', function ($scope, registerViewModel) {

  $scope.vm = registerViewModel;
  
});
