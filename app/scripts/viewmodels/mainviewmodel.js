'use strict';

/**
 * @ngdoc service
 * @name registrationApp.mainViewModel
 * @description
 * # mainViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('mainViewModel', function (settings, popup, calendar, visit, service, $rootScope, $timeout, loading, uiCalendarConfig) {

  var MainAPI = function() {};

  MainAPI.prototype.weeksAvailable = '';
  MainAPI.prototype.getWeeksAvailable = function() {
    var self = this;

    loading.set();
    settings.weeksAvailable().then( function(result) {
      loading.unset();
      self.weeksAvailable = result.attributes.duration;
    });
  };

  MainAPI.prototype.modal = '';
  MainAPI.prototype.takeEvent = function(view, element) {
    var cssClass = view.className[0],
        parent = angular.element(element.target).closest('a'),
        self = this;

    if (!parent.hasClass('old')) {
      if (cssClass) {
        if (cssClass === 'free') {
          self.modal = popup.show('lg', 'book.visit.tpl.html', 'BookVisitCtrl', view);
        }
      }
    }
  };

  //calendar init in view
  MainAPI.prototype.minMaxHours = [];
  MainAPI.prototype.visitDuration = '';
  MainAPI.prototype.createCalendar = function() {
    var self = this,
        booked;

    loading.set();
    calendar.getSchedule().then( function(result) {
      loading.unset();
      self.dailySchedule = result;
      self.events = self.eventsFromSchedule(self.dailySchedule);
      booked = self.getAllBooked(self.events);

      calendar.getMinMaxWorkHours(self.dailySchedule).then( function(result) {
        angular.forEach(result, function(val) {
          self.minMaxHours.push(val);
        });
      });

      settings.visitDuration().then( function(result) {
        self.visitDuration = result.attributes.duration;
        self.visitDurationFormatted = calendar.formatDuration(self.visitDuration);

        self.initCalendar();
      });
    });
  };

  MainAPI.prototype.isCalendarVisible = false;
  MainAPI.prototype.initCalendar = function() {
    var self = this;

    self.isCalendarVisible = true;
    self.config = {
      calendar:{
        defaultView: 'agendaWeek',
        defaultTimedEventDuration: self.visitDurationFormatted,
        lang: 'pl',
        height: 'auto',
        minTime: self.minMaxHours[0],
        maxTime: self.minMaxHours[1],
        editable: false,
        header: {
          right: ''
        },
        eventRender: self.eventRender,
        viewRender: function(view, element) {
          $timeout( function() {
            self.markOldEvents(element);
          });
        },
        eventClick: function(view, element) {
          self.takeEvent(view, element);
        }
      }
    };
  };

  MainAPI.prototype.eventsFromSchedule = function(schedule) {
    var events = [],
        visitDuration,
        self = this;

    loading.set();
    settings.visitDuration().then( function(result) {
      visitDuration = result.attributes.duration;

      angular.forEach(schedule, function(val) {
        var hours = moment(moment(val.attributes.workHours.to, 'HH:mm:ss') - moment(val.attributes.workHours.from, 'HH:mm:ss')).hours() - 1,
            minutes = moment(moment(val.attributes.workHours.to, 'HH:mm:ss') - moment(val.attributes.workHours.from, 'HH:mm:ss')).minutes(),
            time = hours * 60 + minutes,
            visitsAvailable = time / visitDuration;

        if (val.attributes.isSet) {
          for (var i = 0; i < visitsAvailable; i++) {

            var event = {
              start: self.prepareEvents(val.attributes.workHours.from, visitDuration, i, false),
              end: self.prepareEvents(val.attributes.workHours.from, visitDuration, i, true),
              dow: [val.attributes.number],
              className: 'free',
            };
            events.push(event); 
          }
        }
      });

      loading.unset();
    });

    return events;
  };

  MainAPI.prototype.goToWeek = function(direction) {
    uiCalendarConfig.calendars.clientCalendar.fullCalendar(direction);
  };

  MainAPI.prototype.prepareEvents = function(dayHoursFrom, visitDuration, i) {
    var base = moment(dayHoursFrom, 'HH:mm:ss'),
        duration = moment.duration(visitDuration, 'm'),
        display = base.add(duration * i);

    return calendar.padTwoDigits(display.hour()) + ':' + calendar.padTwoDigits(display.minutes()) + ':00';
  };

  MainAPI.prototype.getAllBooked = function(freeEvents) {
    var self = this;

    loading.set();
    visit.getAllBooked().then( function(result) {
      loading.unset();
      $rootScope.allEvents = [freeEvents, result];
    }, function(error) {
      loading.unset();
      self.bookedVisits = error;
    });

    return self.bookedVisits;
  };

  MainAPI.prototype.services = [];
  MainAPI.prototype.getAllServices = function() {
    var self = this;

    loading.set();
    service.getAllServices().then( function(result) {
      loading.unset();
      self.services = result;
    });
  };

  MainAPI.prototype.markOldEvents = function(el) {
    var today = moment().local().format('YYYY-MM-DD'),
        self = this;

    if (el) {
      var index = el.find('[data-date="'+ today +'"]').index(),
          content = angular.element('.fc-content-skeleton'),
          columns = angular.element(content[1]).find('td');

      angular.forEach(columns, function(column) {
        var colIndex = angular.element(column).index();

        if ((colIndex > 0) && (colIndex < index)) {
          angular.element(column).find('a').addClass('old');
        }
      });

      angular.forEach(self.daysOff, function(dayOff) {
        var index = el.find('[data-date="'+ moment(dayOff.attributes.date).local().format('YYYY-MM-DD') +'"]').index(),
            content = angular.element('.fc-content-skeleton'),
            columns = angular.element(content[1]).find('td');

        angular.forEach(columns, function(column) {
          var colIndex = angular.element(column).index();

          if (index === colIndex) {
            angular.element(column).find('a').addClass('old');
          }
        });
      });
    }
  };

  MainAPI.prototype.daysOff = [];
  MainAPI.prototype.getAllDaysOff = function() {
    var self = this;

    loading.set();
    service.getAllDaysOff().then( function(result) {
      loading.unset();
      self.daysOff = result;
    });
  };

  return new MainAPI();

});
