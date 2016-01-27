'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminViewModel
 * @description
 * # adminViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminViewModel', function (user, calendar, settings, uiCalendarConfig, service, $filter, day) {

  var AdminAPI = function() {};

  AdminAPI.prototype.isAdmin = false;
  AdminAPI.prototype.checkIfAdmin = function() {
    var self = this;

    user.isAdmin().then( function(result) {
      self.isAdmin = result;
    });
  };

  AdminAPI.prototype.events = [];
  AdminAPI.prototype.eventSources = [];

  AdminAPI.prototype.weeksAvailable;
  AdminAPI.prototype.getWeeksAvailable = function() {
    var self = this;

    settings.weeksAvailable().then( function(result) {
      self.weeksAvailable = result.attributes.duration;
    });
  };

  AdminAPI.prototype.updateWeeksAvailable = function(value) {
    settings.updateWeeksAvailable(value).then( function(result) {
      console.log(result);
    });
  };

  AdminAPI.prototype.updateVisitDuration = function(value) {
    settings.updateVisitDuration(value).then( function(result) {
      console.log(result);
    });
  };

  AdminAPI.prototype.eventsFromSchedule = function(schedule) {
    var events = [];
    angular.forEach(schedule, function(val, key) {
      if (val.attributes.workHours.from) {
        var event = {
          start: val.attributes.workHours.from,
          end: val.attributes.workHours.to,
          dow: [val.attributes.number],
          className: 'availability'
        }
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

    service.getAllServices().then( function(result) {
      self.services = result;
    })
  };

  AdminAPI.prototype.newServiceInputCount = 0;
  AdminAPI.prototype.addServiceInput = function(servicesModel) {
    var self = this;

    servicesModel.push({tempId: self.newServiceInputCount += 1, order: servicesModel.length});
  };

  AdminAPI.prototype.saveServicesChanges = function(servicesModel) {
    var self = this;

    service.updateAllServices(servicesModel).then( function(result) {
      if (result) {
        self.getAllServices();
      } else {
        console.log('error');
      }
    })
  };

  AdminAPI.prototype.removeService = function(id, tempId, servicesModel) {
    if (!id) {
      angular.forEach(servicesModel, function(obj, index) {
        if (obj.tempId === tempId) {
          servicesModel.splice(index, 1);

          return;
        }
      })
    } else {
      service.removeService(id).then( function(result) {
        angular.forEach(servicesModel, function(obj, index) {
          if (obj.id === id) {
            servicesModel.splice(index, 1);

            return;
          }
        })
      })
    }
  };

  AdminAPI.prototype.setServicesNewOrder = function() {
    var self = this;

    angular.forEach(self.services, function(obj, index) {
      obj.order = index;
    });
  };

  AdminAPI.prototype.editWH;
  AdminAPI.prototype.showEditWorkHours = function(event) {
    var self = this,
        date = {
          dow: '',
          weekDay: {},
          start: {},
          end: {}
        };

    self.editWH = {};

    date.dow = angular.copy(event.dow[0]);
    date.weekDay = event.start.format('dddd')
    date.start = angular.copy(event.start);
    date.start.set('hour', date.start.hour() - 1);
    date.start = new Date(date.start);
    date.end = angular.copy(event.end);
    date.end.set('hour', date.end.hour() - 1);
    date.end = new Date(date.end);

    self.editWH = date;
  };

  AdminAPI.prototype.hstep = 1;
  AdminAPI.prototype.mstep = 15;

  AdminAPI.prototype.padTwoDigits = function(number) {
    return (number < 10 ? '0' : '') + number;
  };

  AdminAPI.prototype.saveEditWH = function(editWH) {
    /* prepare data */
    var self = this,
        from = new Date(editWH.start),
        to = new Date(editWH.end),
        model = {
          dow: '',
          start: {},
          end: {}
        };

    model.dow = editWH.dow;
    model.start =   
      self.padTwoDigits(from.getHours())+':'+self.padTwoDigits(from.getMinutes())+':'+self.padTwoDigits(from.getSeconds());  

    model.end =
      self.padTwoDigits(to.getHours())+':'+self.padTwoDigits(to.getMinutes())+':'+self.padTwoDigits(to.getSeconds()); 
    /* / prepare data */

    day.updateAllWH(model).then( function(result) {
      angular.forEach(self.events, function(val, key) {
        if (val.dow[0] === result.attributes.number) {
          var newElement = angular.copy(val);
          newElement._id = self.events[self.events.length - 1]._id + 1;
          newElement.start = result.attributes.workHours.from;
          newElement.end = result.attributes.workHours.to;
          
          self.events.splice(key, 1);
          self.events.push(newElement);
        }
      });

    })
  };

  return new AdminAPI();

});