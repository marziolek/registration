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
  
  
  $scope.takeEvent = function(element) {
    var cssClass = element.className[0];

    if (cssClass) {
      if (cssClass === 'free') {
        popup.show('book.visit.tpl.html', 'BookVisitCtrl', element);
      }
    }
  };

  $scope.dailySchedule, $scope.minMaxHours = [], $scope.isCalendarVisible = false;

  calendar.getSchedule().then( function(result) {
    $scope.dailySchedule = result;

    calendar.getMinMaxWorkHours($scope.dailySchedule).then( function(result) {
      angular.forEach(result, function(val, key) {
        $scope.minMaxHours.push(val);
      });
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

  var initCalendar = function() {
    $scope.isCalendarVisible = true;
    $scope.config = {
      calendar:{
        defaultView: 'agendaWeek',
        defaultTimedEventDuration: $scope.visitDurationFormatted,
        lang: 'pl',
        height: 'auto',
        minTime: $scope.minMaxHours[0],
        maxTime: $scope.minMaxHours[1],
        editable: false,
        header: {
          right: ''
        },
        /*viewRender: function(view, element) {
        $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
      },*/
        eventClick: $scope.takeEvent,
        eventRender: $scope.eventRender
      }
    };  
  }

  });