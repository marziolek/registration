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
  
  $scope.vm.popupData = element;

  $scope.vm.popupDataTime = $scope.vm.popupData.start.format('HH:mm');
  $scope.vm.popupDataDayName = $scope.vm.popupData.start.format('dddd');
  $scope.vm.popupDataDateRaw = new Date($scope.vm.popupData.start);
  $scope.vm.popupDataDate = $scope.vm.popupData.start.format('D MMMM YYYY');

  // init dropdowns - formstone
  $('.demo_basic').dropdown();

  $('.demo_basic').on("change", function() {
    var value = $(this).val();
    console.log(value);
  });
  
});
