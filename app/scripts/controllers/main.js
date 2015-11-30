'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registrationApp
 */
angular.module('registrationApp')
  .controller('MainCtrl', function ($scope) {

  $scope.config = {
    calendar:{
      height: '100%',
      editable: true,
      header: {
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      dayNames: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      dayNamesShort: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd']
    }
  };

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();


  $scope.events = [
    [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}  
    ]
  ];
});
