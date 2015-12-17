'use strict';

/**
 * @ngdoc directive
 * @name registrationApp.directive:calendarNavigation
 * @description
 * # calendarNavigation
 */
angular.module('registrationApp')
  .directive('calendarNavigation', function (uiCalendarConfig) {
  return {
    templateUrl: '/views/templates/calendar.navigation.tpl.html',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      var clicks = 1, maxClicks = parseInt(attrs.max);
      scope.disableBtnPrev = true;
      scope.disableBtnNext = false;

      scope.goTo = function(direction) {
        var calendarName = attrs.calendar;

        angular.forEach(uiCalendarConfig.calendars, function(val, key) {
          val.fullCalendar(direction);
        });

        switch(direction) {
          case 'next':
            clicks++;
            break;
          case 'prev':
            clicks--;
            break;
          case 'today':
            clicks = 1;
          default:
            break;
        };

        if (clicks >= maxClicks) {
          scope.disableBtnNext = true;
        } else {
          scope.disableBtnNext = false;
        };

        if (clicks > 1) {
          scope.disableBtnPrev = false;
        } else {
          scope.disableBtnPrev = true;
        };
      };
    }
  };
});
