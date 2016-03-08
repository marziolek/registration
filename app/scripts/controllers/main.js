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

  /* $scope.eventRender = function(event, element, view ) {
    element.attr({'tooltip': event.description,
                  'tooltip-append-to-body': true});
    $compile(element)($scope);
  };*/

  $scope.vm = mainViewModel;
  $scope.vm.getWeeksAvailable();

  $scope.dailySchedule, $scope.minMaxHours = [];

  $scope.vm.createCalendar();

  var windowH = $(window).height(),
      date = new Date(),
      d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear(),
      events = [
        {start: new Date(y, m, d), className: 'taken'},
        {start: new Date(y, m, d, 14), className: 'taken'},
        {start: new Date(y, m, d, 14, 30), className: 'taken'},
        {start: new Date(y, m, d, 15), className: 'taken'},
        {start: new Date(y, m, d, 15, 30), className: 'taken'},
        {start: new Date(y, m, d, 16), className: 'taken'},
        {start: new Date(y, m, d, 16, 30), className: 'taken'},
        {start: new Date(y, m, d, 17), className: 'taken'},
        {start: new Date(y, m, d, 17, 30), className: 'taken'},
        {start: new Date(y, m, d, 18), className: 'taken'},
        {start: new Date(y, m, d, 18, 30), className: 'taken'},
        {start: new Date(y, m, d, 19), className: 'taken'},
        {start: new Date(y, m, d, 19, 30), className: 'taken'},
        {start: new Date(y, m, d + 1), className: 'free'},
        {start: new Date(y, m, d + 1, 14), className: 'free'},
        {start: new Date(y, m, d + 1, 14, 30), className: 'taken'},
        {start: new Date(y, m, d + 1, 15), className: 'free'},
        {start: new Date(y, m, d + 1, 15, 30), className: 'taken'},
        {start: new Date(y, m, d + 1, 16), className: 'free'},
        {start: new Date(y, m, d + 1, 16, 30), className: 'free'},
        {start: new Date(y, m, d + 1, 17), className: 'taken'},
        {start: new Date(y, m, d + 1, 17, 30), className: 'free'},
        {start: new Date(y, m, d + 1, 18), className: 'taken'},
        {start: new Date(y, m, d + 1, 18, 30), className: 'taken'},
        {start: new Date(y, m, d + 1, 19), className: 'free'},
        {start: new Date(y, m, d + 1, 19, 30), className: 'taken'},
      ];

  $scope.events = [events];

});