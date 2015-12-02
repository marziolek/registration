'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('MainCtrl', function ($scope, $log, $window, $compile, popup) {

  $scope.eventRender = function(event, element, view ) {
    element.attr({'tooltip': event.description,
                  'tooltip-append-to-body': true});
    $compile(element)($scope);
  };

    
  $scope.takeEvent = function(element, jsEvent, view) {
    
    /*
    * check if !taken - should be verified on cloud code
    */

    var cssClass = element.className[0];
    if (cssClass) {
      if (cssClass === 'free') {
        // do if free
        $log.debug('free');
        popup.show();
        
      } else if (cssClass === 'taken') {
        // do if taken
        
        $log.debug('taken');
      }
    }

    console.log(element);
/*
    console.log(jsEvent);
    console.log(view);
*/

    /*
    * open dialog to login/register
    * or
    * open dialog to fill additional description and submit choice
    */ 

  };


  var windowH = $(window).height(),
      date = new Date(),
      d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear(),
      events = [
        {title: 'taken', start: new Date(y, m, 1), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 14), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 14, 30), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 15), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 15, 30), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 16), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 16, 30), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 17), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 17, 30), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 18), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 18, 30), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 19), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 1, 19, 30), className: 'taken'},


        {title: 'free', start: new Date(y, m, 2), className: 'free'},
        {title: 'free', start: new Date(y, m, 2, 14), className: 'free'},
        {title: 'taken', start: new Date(y, m, 2, 14, 30), className: 'taken'},
        {title: 'free', start: new Date(y, m, 2, 15), className: 'free'},
        {title: 'taken', start: new Date(y, m, 2, 15, 30), className: 'taken'},
        {title: 'free', start: new Date(y, m, 2, 16), className: 'free'},
        {title: 'free', start: new Date(y, m, 2, 16, 30), className: 'free'},
        {title: 'taken', start: new Date(y, m, 2, 17), className: 'taken'},
        {title: 'free', start: new Date(y, m, 2, 17, 30), className: 'free'},
        {title: 'taken', start: new Date(y, m, 2, 18), className: 'taken'},
        {title: 'taken', start: new Date(y, m, 2, 18, 30), className: 'taken'},
        {title: 'free', start: new Date(y, m, 2, 19), className: 'free'},
        {title: 'taken', start: new Date(y, m, 2, 19, 30), className: 'taken'},
      ];

  $scope.events = [events];

  /* should be always at the bottom  - LOCALE for months? */
  $scope.config = {
    calendar:{
      defaultView: 'agendaWeek',
      defaultTimedEventDuration: '00:30:00',
      lang: 'pl',
      minTime: '14:00:00',
      maxTime: '20:00:00',
      height: windowH,
      editable: false,
      header: {
        right: 'today prev,next'
      },
      dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      dayNamesShort: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'],
      viewRender: function(view, element) {
        $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
      },
      eventClick: $scope.takeEvent,
      eventRender: $scope.eventRender
    }
  };

});
