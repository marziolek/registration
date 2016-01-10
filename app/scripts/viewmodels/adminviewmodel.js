'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminViewModel
 * @description
 * # adminViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminViewModel', function (user, calendar, settings, uiCalendarConfig, service, $filter) {

  var AdminAPI = function() {};

  AdminAPI.prototype.isAdmin = false;
  AdminAPI.prototype.checkIfAdmin = function() {
    var self = this;

    user.isAdmin().then( function(result) {
      self.isAdmin = result;
    });
  };

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

    servicesModel.push({tempId: self.newServiceInputCount += 1});
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

  return new AdminAPI();

});