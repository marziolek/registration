'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('MainCtrl', function ($scope, mainViewModel, popup, calendar, settings) {

  $scope.vm = mainViewModel;
  $scope.vm.getWeeksAvailable();
  $scope.vm.getAllServices();

  $scope.dailySchedule, $scope.minMaxHours = [];

  $scope.vm.createCalendar();
  
  var windowH = $(window).height();
});