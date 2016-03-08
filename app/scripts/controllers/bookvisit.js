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
  
  var data = element;

  $scope.time = data.start.format('HH:mm');
  $scope.dayName = data.start.format('dddd');
  $scope.dateRaw = new Date(data.start);
  $scope.date = data.start.format('D MMMM YYYY');

  // init dropdowns - formstone
  $('.demo_basic').dropdown();

  $('.demo_basic').on("change", function() {
    var value = $(this).val();
    console.log(value);
  });
  
});
