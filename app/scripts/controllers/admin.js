'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('AdminCtrl', function ($scope, adminViewModel, calendar, settings) {

  $scope.vm = adminViewModel;
  $scope.vm.checkIfAdmin();
  $scope.vm.getWeeksAvailable();

  $scope.dailySchedule = [], $scope.isCalendarVisible = false;

  calendar.getSchedule().then( function(result) {
    angular.forEach(result, function(val, key) {
      $scope.dailySchedule.push(val);
    });

    settings.visitDuration().then( function(result) {
      $scope.visitDuration = result.attributes.duration;
      $scope.visitDurationFormatted = formatDuration($scope.visitDuration);

      initCalendar();
    });
  });

  var formatDuration = function(duration) {
    var l = duration.toString().length, formatted;
    
    switch(l) {
      case 1:
        formatted = '00:0' + duration + ':00';
        break;
      case 2:
        formatted = '00:' + duration + ':00';
        break;
      case 3:
        formatted = padTwoDigits(parseInt(duration % 60)) + ':' + padTwoDigits(duration % 60) + ':00';
        break;
      default: 
        formatted = '00:30:00';
        break;
    };
    
    return formatted;
  };

  var padTwoDigits = function(number) {
    return (number < 10 ? '0' : '') + number;
  };

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
        defaultTimedEventDuration: $scope.visitDurationFormatted,
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

  $scope.updateVisitDuration = function(duration) {
    $scope.vm.updateVisitDuration(duration);
  };

});