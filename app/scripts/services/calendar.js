'use strict';

/**
 * @ngdoc service
 * @name registrationApp.calendar
 * @description
 * # calendar
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('calendar', function ($q) {

  return {
    getSchedule: function() {
      var q = $q.defer(), self = this;

      Parse.Cloud.run('getSchedule').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },
    getMinMaxWorkHours: function(schedule) {
      var q = $q.defer(), self = this, result;

      result = self.minMaxWorkHours(schedule);
      q.resolve(result);

      return q.promise;
    },


    // local functions
    minMaxWorkHours: function(days) {
      var from = [], to = [], workHours = [], minFrom, maxTo, self = this;

      angular.forEach(days, function(day) {
        if (day.attributes.workHours.from) {
          var number = day.attributes.workHours.from;
          number = number.replace(/:/g,'');
          from.push(parseInt(number));
        }
        if (day.attributes.workHours.to) {
          var number = day.attributes.workHours.to;
          number = number.replace(/:/g,'');
          to.push(parseInt(number));
        }
      });

      minFrom = Math.min.apply(null, from);
      minFrom = minFrom.toString();
      maxTo = Math.max.apply(null, to);
      maxTo = maxTo.toString();

      workHours = [self.makeHourString(minFrom), self.makeHourString(maxTo)];

      return workHours;
    },

    makeHourString: function(hour) {
      var a = hour.slice(-6, -4), b = hour.slice(-4, -2), c = hour.slice(-2);

      return (a + ':' + b + ':' + c);
    }
  };

});