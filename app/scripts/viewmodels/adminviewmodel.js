'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminViewModel
 * @description
 * # adminViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminViewModel', function (user, calendar, settings, uiCalendarConfig, service, $filter, day, visit, $anchorScroll, $location, Flash, loading) {

  var AdminAPI = function() {};

  AdminAPI.prototype.isAdmin = false;
  AdminAPI.prototype.checkIfAdmin = function() {
    var self = this;

    loading.set();
    user.isAdmin().then( function(result) {
      loading.unset();
      self.isAdmin = result;
    });
  };

  AdminAPI.prototype.events = [];
  AdminAPI.prototype.eventSources = [];

  AdminAPI.prototype.weeksAvailable = '';
  AdminAPI.prototype.getWeeksAvailable = function() {
    var self = this;

    loading.set();
    settings.weeksAvailable().then( function(result) {
      loading.unset();
      self.weeksAvailable = result.attributes.duration;
    });
  };

  AdminAPI.prototype.updateWeeksAvailable = function(value) {
    loading.set();

    settings.updateWeeksAvailable(value).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Ustawienia zapisane.';
          flashClass = 'success';
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  AdminAPI.prototype.updateVisitDuration = function(value) {
    loading.set();

    settings.updateVisitDuration(value).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Ustawienia zapisane.';
          flashClass = 'success';
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  AdminAPI.prototype.eventsFromSchedule = function(schedule) {
    var events = [];
    angular.forEach(schedule, function(val, key) {
      var event;
      if (val.attributes.isSet) {
        event = {
          _id: key,
          start: val.attributes.workHours.from,
          end: val.attributes.workHours.to,
          dow: [val.attributes.number],
          className: 'availability',
          isSet: val.attributes.isSet
        };
        events.push(event); 
      } else {
        event = {
          _id: key,
          start: val.attributes.workHours.from,
          end: val.attributes.workHours.to,
          dow: [val.attributes.number],
          className: 'availability free-event',
          isSet: val.attributes.isSet
        };
        events.push(event); 
      }
    });

    return events;
  };

  AdminAPI.prototype.goToWeek = function(direction) {
    uiCalendarConfig.calendars.adminCalendar.fullCalendar(direction);
  };

  AdminAPI.prototype.services = [];
  AdminAPI.prototype.getAllServices = function() {
    var self = this;

    loading.set();
    service.getAllServices().then( function(result) {
      loading.unset();
      self.services = result;
    });
  };

  AdminAPI.prototype.newServiceInputCount = 0;
  AdminAPI.prototype.addServiceInput = function(servicesModel) {
    var self = this;

    servicesModel.push({tempId: self.newServiceInputCount += 1, order: servicesModel.length});
  };

  AdminAPI.prototype.saveServicesChanges = function(servicesModel) {
    var self = this;

    loading.set();
    service.updateAllServices(servicesModel).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Ustawienia zapisane.';
          flashClass = 'success';

          self.getAllServices();
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  AdminAPI.prototype.removeService = function(id, tempId, servicesModel) {
    if (!id) {
      angular.forEach(servicesModel, function(obj, index) {
        if (obj.tempId === tempId) {
          servicesModel.splice(index, 1);

          return;
        }
      });
    } else {
      loading.set();
      service.removeService(id).then( function(result) {
        loading.unset();
        angular.forEach(servicesModel, function(obj, index) {
          if (obj.id === id) {
            servicesModel.splice(index, 1);

            return;
          }
        });

        var message, flashClass;
        if (result.code) {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
          Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
        } else {
          if (result) {
            message = 'Usługa usunięta.';
            flashClass = 'success';
          } else {
            message = 'Wystąpił błąd.';
            flashClass = 'danger';
          }
          Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
        }
      });
    }
  };

  AdminAPI.prototype.setServicesNewOrder = function() {
    var self = this;

    angular.forEach(self.services, function(obj, index) {
      obj.order = index;
    });
  };

  AdminAPI.prototype.editWH = '';
  AdminAPI.prototype.showEditWorkHours = function(event) {
    var self = this,
        date = {
          dow: '',
          weekDay: {},
          start: {},
          end: {},
          isSet: false
        };

    self.editWH = {};

    date.dow = angular.copy(event.dow[0]);
    date.weekDay = event.start.format('dddd');
    date.start = angular.copy(event.start.local());

    date.start.set('hour', date.start.hour());
    date.start = new Date(date.start);
    date.end = angular.copy(event.end.local());
    date.end.set('hour', date.end.hour());
    date.end = new Date(date.end);
    date.isSet = event.isSet;

    self.editWH = date;
  };

  AdminAPI.prototype.hstep = 1;
  AdminAPI.prototype.mstep = 15;
  AdminAPI.prototype.isCalendarVisible = false;
  AdminAPI.prototype.visitDurationFormatted = '';
  AdminAPI.prototype.minMaxHours = [];
  AdminAPI.prototype.eventRender = '';

  AdminAPI.prototype.saveEditWH = function(editWH) {
    /* prepare data */
    var self = this,
        from = new Date(editWH.start),
        to = new Date(editWH.end),
        model = {
          dow: '',
          start: {},
          end: {},
          isSet: false
        };

    model.dow = editWH.dow;
    model.start =   
      calendar.padTwoDigits(from.getHours())+':'+calendar.padTwoDigits(from.getMinutes())+':'+calendar.padTwoDigits(from.getSeconds());  

    model.end =
      calendar.padTwoDigits(to.getHours())+':'+calendar.padTwoDigits(to.getMinutes())+':'+calendar.padTwoDigits(to.getSeconds()); 
    model.isSet = editWH.isSet;
    /* / prepare data */

    loading.set();
    day.updateAllWH(model).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Ustawienia zapisane.';
          flashClass = 'success';

          self.getAllServices();
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
      
      angular.forEach(self.events, function(val, key) {
        if (val.dow[0] === result.attributes.number) {
          var newElement = angular.copy(val);
          newElement._id = Math.floor((Math.random() * (99999 - 20)) + 20);

          newElement.start = result.attributes.workHours.from;
          newElement.end = result.attributes.workHours.to;

          self.events.splice(key, 1);
          self.events.push(newElement);
        }
      });
    });
  };

  AdminAPI.prototype.formatDateToDayName = function(date) {
    return moment(date).format('dddd');
  };

  AdminAPI.prototype.closeEditWH = function() {
    this.editWH = false;
  };

  //calendar init in view
  AdminAPI.prototype.createCalendar = function() {
    var self = this;

    loading.set();
    calendar.getSchedule().then( function(result) {
      loading.unset();

      self.dailySchedule = result;
      self.events = self.eventsFromSchedule(self.dailySchedule);

      self.eventSources = [self.events];

      // add fake events on empty days TODO

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

  AdminAPI.prototype.initCalendar = function() {
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
        eventClick: function(view) {
          self.showEditWorkHours(view);
        }
      }
    };  
  };

  AdminAPI.prototype.eventRender = function( event, element ) { 
    if (!element.hasClass('free-event')) {
      element.find('.fc-content').append('<span class="edit-event">Edytuj</span>');
    } else {
      element.find('.fc-content').append('<span class="edit-event glyphicon glyphicon-plus"></span>');
    }
  };

  AdminAPI.prototype.visits = [];
  AdminAPI.prototype.isMoreToLoad = true;
  AdminAPI.prototype.getAllVisits = function(from) {
    var self = this;

    loading.set();
    visit.getAllVisits(from).then( function(result) {
      loading.unset();
      self.visits = result[0];
      self.isMoreToLoad = result[1];
    }, function(error) {
      self.visits = error;
    });
  };

  AdminAPI.prototype.countWeeksBack = 0;
  AdminAPI.prototype.displayWeekFrom = moment().format('DD.MM.YYYY');
  AdminAPI.prototype.prevWeekCount = 7;
  AdminAPI.prototype.prevWeekVisits = function(counter) {
    var self = this,
        from = moment().subtract(self.prevWeekCount * counter, 'days');

    self.displayWeekFrom = from.format('DD.MM.YYYY');
    this.getAllVisits(from);
  };

  AdminAPI.prototype.monthStart = '';
  AdminAPI.prototype.displayMonth = function(date) {
    var monthTmp = $filter('date')(date, 'd MMMM'),
        self = this;

    if (self.monthStart !== monthTmp) {
      self.monthStart = monthTmp;

      return true;
    } else {
      return false;
    }
  };

  AdminAPI.prototype.isVisitToday = function(date) {
    var now = moment().toDate(),
        nowFormatted = now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear(),
        dateFormatted = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

    if (nowFormatted === dateFormatted) {
      return 'dzisiaj';
    }
  };

  AdminAPI.prototype.goToAnchor = function(hash) {
    $location.hash(hash);
    $anchorScroll.yOffset = 60;
    $anchorScroll();

    angular.element('#' + hash).addClass('anchor-highlight');
    setTimeout( function() {
      angular.element('#' + hash).removeClass('anchor-highlight');
    }, 2000);
  };

  AdminAPI.prototype.cancelVisit = function(id) {
    loading.set();

    visit.cancelVisit(id).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Wizyta została odwołana.';
          flashClass = 'success';

          angular.element('[data-item-id="' + id + '"]').addClass('canceled');
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  AdminAPI.prototype.enableVisit = function(id) {
    loading.set();
    visit.enableVisit(id).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result.id) {
          message = 'Wizyta została przywrócona.';
          flashClass = 'success';

          angular.element('[data-item-id="' + id + '"]').removeClass('canceled');
        } else {
          message = result;
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  return new AdminAPI();

});