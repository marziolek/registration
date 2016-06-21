'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:BookVisitCtrl
 * @description
 * # BookVisitCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('BookVisitCtrl', function ($scope, element, bookVisitViewModel) {

  $scope.vm = bookVisitViewModel;
  $scope.vm.getAllServices();

  $scope.vm.isAdminCheck();
  $scope.vm.popupData = element;

  $scope.vm.popupDataTime = $scope.vm.popupData.start.local().format('HH:mm');
  $scope.vm.popupDataDayName = $scope.vm.popupData.start.local().format('dddd');
  $scope.vm.popupDataDateRaw = $scope.vm.popupData.start.local().toDate();
  $scope.vm.popupDataDate = $scope.vm.popupData.start.local().format('D MMMM YYYY');  
});
