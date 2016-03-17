'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('MainCtrl', function ($scope, $rootScope, mainViewModel, popup, calendar, settings) {

  $scope.vm = mainViewModel;
  $scope.vm.getWeeksAvailable();

  $scope.dailySchedule, $scope.minMaxHours = [];

  $scope.vm.createCalendar();

  var windowH = $(window).height();
});