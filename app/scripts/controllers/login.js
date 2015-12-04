'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('LoginCtrl', function ($scope, loginViewModel) {

  $scope.vm = loginViewModel;

});
