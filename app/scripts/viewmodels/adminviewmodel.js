'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminViewModel
 * @description
 * # adminViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminViewModel', function (user, calendar, settings) {

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

  return new AdminAPI();

});