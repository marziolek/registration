'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:ResendVerificationEmailCtrl
 * @description
 * # ResendVerificationEmailCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('ResendVerificationEmailCtrl', function ($scope, resendVerificationEmailViewModel) {

  $scope.vm = resendVerificationEmailViewModel;

});
