'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('AdminCtrl', function ($scope, adminViewModel, calendar) {

  $scope.vm = adminViewModel;
  $scope.vm.checkIfAdmin();
  $scope.vm.getWeeksAvailable();

  $scope.dailySchedule = [], $scope.isCalendarVisible = false;
  calendar.getSchedule().then( function(result) {
    angular.forEach(result, function(val, key) {
      $scope.dailySchedule.push(val);
    });

    initCalendar();
  });

  //calendar 
  var date = new Date(),
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

  var initCalendar = function() {
    $scope.isCalendarVisible = true;
    $scope.config = {
      calendar:{
        defaultView: 'agendaWeek',
        defaultTimedEventDuration: '00:30:00',
        lang: 'pl',
        height: 'auto',
        minTime: $scope.dailySchedule[0],
        maxTime: $scope.dailySchedule[1],
        editable: false,
        header: {
          right: 'today prev,next'
        },
        /*viewRender: function(view, element) {
        $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
      },*/
        eventClick: $scope.takeEvent,
        eventRender: $scope.eventRender
      }
    };  
  }

  $scope.updateWeeks = function(weeks) {
    $scope.vm.updateWeeksAvailable(weeks);
  };

});