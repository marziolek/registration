'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('AdminCtrl', function ($scope, adminViewModel, calendar, settings, $compile, uiCalendarConfig) {

  $scope.vm = adminViewModel;
  $scope.vm.checkIfAdmin();
  $scope.vm.getWeeksAvailable();
  $scope.vm.getAllServices();

  $scope.vm.createCalendar();

  $scope.updateWeeks = function(weeks) {
    $scope.vm.updateWeeksAvailable(weeks);
  };

  $scope.updateVisitDuration = function(duration) {
    $scope.vm.updateVisitDuration(duration);
  };

  $scope.sortOptions = {
    handle: '.sort-handle',
    stop: function(e, ui) {
      $scope.vm.setServicesNewOrder();
    }
  };
});