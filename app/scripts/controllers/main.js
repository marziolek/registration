'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('MainCtrl', function ($scope, $rootScope, $log,) {

  currentUser.set();
  $rootScope.user = currentUser.get();
  
 /* $scope.eventRender = function(event, element, view ) {
    element.attr({'tooltip': event.description,
                  'tooltip-append-to-body': true});
    $compile(element)($scope);
  };*/

  $scope.takeEvent = function(element, jsEvent, view) {
    var cssClass = element.className[0];
    if (cssClass) {
      if (cssClass === 'free') {
        // do if free
        /*
        * open dialog to login/register
        * or
        * open dialog to fill additional description and submit choice
        */ 
        popup.show();
      }
    }
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
      /*viewRender: function(view, element) {
        $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
      },*/
      eventClick: $scope.takeEvent,
      eventRender: $scope.eventRender
    }
  };

});
