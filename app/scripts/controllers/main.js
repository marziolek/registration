'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('MainCtrl', function ($scope, $rootScope, mainViewModel) {

  if (!$rootScope.allEvents) {
    $rootScope.allEvents = [];
  }
  
  $scope.vm = mainViewModel;
  $scope.vm.getWeeksAvailable();
  $scope.vm.getAllServices();

  $scope.dailySchedule = '';
  $scope.minMaxHours = [];

  $scope.vm.createCalendar();
  
  $scope.vm.getAllDaysOff();
  $scope.vm.markOldEvents();
});