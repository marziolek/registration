'use strict';

/**
 * @ngdoc service
 * @name registrationApp.mainViewModel
 * @description
 * # mainViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('mainViewModel', function (settings, popup, calendar, visit) {

  var MainAPI = function() {};

  MainAPI.prototype.weeksAvailable;
  MainAPI.prototype.getWeeksAvailable = function() {
    var self = this;

    settings.weeksAvailable().then( function(result) {
      self.weeksAvailable = result.attributes.duration;
    });
  };

  MainAPI.prototype.takeEvent = function(element) {
    var cssClass = element.className[0];

    if (cssClass) {
      if (cssClass === 'free') {
        popup.show('book.visit.tpl.html', 'BookVisitCtrl', element);
      }
    }
  };

  //calendar init in view
  MainAPI.prototype.minMaxHours = [];
  MainAPI.prototype.visitDuration;
  MainAPI.prototype.createCalendar = function() {
    var self = this;

    calendar.getSchedule().then( function(result) {
      self.dailySchedule = result;
      self.events = self.eventsFromSchedule(self.dailySchedule);
      self.eventSources = [self.events];

      calendar.getMinMaxWorkHours(self.dailySchedule).then( function(result) {
        angular.forEach(result, function(val, key) {
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
        /*
        viewRender: function(view, element) {
          $log.debug(element);
        },*/
        eventClick: function(view, element) {
          console.log(view);
          self.takeEvent(view);
        }
      }
    };  
  };

  MainAPI.prototype.eventsFromSchedule = function(schedule) {
    var events = [],
        visitDuration,
        self = this;

    settings.visitDuration().then( function(result) {
      visitDuration = result.attributes.duration;

      angular.forEach(schedule, function(val, key) {
        var hours = moment(moment(val.attributes.workHours.to, "HH:mm:ss") - moment(val.attributes.workHours.from, "HH:mm:ss")).hours() - 1,
            minutes = moment(moment(val.attributes.workHours.to, "HH:mm:ss") - moment(val.attributes.workHours.from, "HH:mm:ss")).minutes(),
            time = hours * 60 + minutes,
            visitsAvailable = time / visitDuration;

        if (val.attributes.isSet) {
          for (var i = 0; i < visitsAvailable; i++) {
            
            var event = {
              //_id: key,
              start: self.prepareEvents(val.attributes.workHours.from, visitDuration, i, false),
              end: self.prepareEvents(val.attributes.workHours.from, visitDuration, i, true),
              dow: [val.attributes.number],
              className: 'free',
              //isSet: val.attributes.isSet
            }
            events.push(event); 
          }
        } else {
          var event = {
            _id: key,
            start: val.attributes.workHours.from,
            end: val.attributes.workHours.to,
            dow: [val.attributes.number],
            className: 'availability free-event',
            isSet: val.attributes.isSet
          }
          events.push(event); 
        }
      });
    });

    return events;
  };
  
  MainAPI.prototype.goToWeek = function(direction) {
    uiCalendarConfig.calendars.clientCalendar.fullCalendar(direction);
  };

  MainAPI.prototype.prepareEvents = function(dayHoursFrom, visitDuration, i, isEnd) {
    var base = moment(dayHoursFrom, "HH:mm:ss"),
        duration = moment.duration(visitDuration, "m"),
        display = base.add(duration * i);
    
    return calendar.padTwoDigits(display.hour()) + ":" + calendar.padTwoDigits(display.minutes()) + ":00";
  };
  
  return new MainAPI();

});
