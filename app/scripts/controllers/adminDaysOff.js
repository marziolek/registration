'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:AdminDaysOffCtrl
 * @description
 * # AdminDaysOffCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('AdminDaysOffCtrl', function ($scope, adminDaysOffViewModel) {

  $scope.vm = adminDaysOffViewModel;
  $scope.daysOff = $scope.vm.daysOff;
  $scope.vm.getAllDaysOff();

  $scope.$watch('vm.daysOff', function(newVal, oldVal) {
    if (newVal) {
      $scope.daysOff = newVal;
      $scope.$broadcast('refreshDatepickers');
    }
  });

  $scope.getDayClass = function(data) {
    var date = data.date,
        mode = data.mode;

    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.daysOff.length; i++){
        var currentDay = new Date($scope.daysOff[i].attributes.date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return 'day-off-taken';
        }
      }
    }

    return '';
  };

  $scope.options = {
    customClass: $scope.getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.$watch('vm.date', function(newVal) {
    var breakNow = false;
    angular.forEach($scope.daysOff, function(val) {
      if (!breakNow) {
        if (val.attributes.date.setHours(0,0,0,0) === newVal.setHours(0,0,0,0)) {
          $scope.vm.removeBtnVisible = true;
          breakNow = true;
        } else {
          $scope.vm.removeBtnVisible = false;
        }
      }
    });
  });

});
