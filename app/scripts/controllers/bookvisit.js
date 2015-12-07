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
  
  var data = element;
  
  $scope.dayName = data.start.format('dddd');
  $scope.date = data.start.format('D MMMM YYYY');
  
});
