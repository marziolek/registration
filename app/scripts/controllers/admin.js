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

  $scope.dailySchedule, $scope.minMaxHours = [], $scope.isCalendarVisible = false;

  calendar.getSchedule().then( function(result) {
    $scope.dailySchedule = result;
    $scope.vm.events = $scope.vm.eventsFromSchedule($scope.dailySchedule);

    $scope.vm.eventSources = [$scope.vm.events];

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

  var padTwoDigits = function(digit) {
    return $scope.vm.padTwoDigits(digit);
  };

  //calendar 
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
        eventRender: $scope.eventRender,
        /*
        viewRender: function(view, element) {
          $log.debug(element);
        },*/
        eventClick: function(view, element) {
          $scope.vm.showEditWorkHours(view);
        }
      }
    };  
  };

  $scope.eventRender = function( event, element ) { 
    element.find('.fc-content').append('<span class="edit-event">Edytuj</span>');
  };

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