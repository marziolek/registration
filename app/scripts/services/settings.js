'use strict';

/**
 * @ngdoc service
 * @name registrationApp.settings
 * @description
 * # settings
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('settings', function ($q) {

  return {
    weeksAvailable: function() {
      var q = $q.defer();

      Parse.Cloud.run('getDefaultWeeksAvailable').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },

    updateWeeksAvailable: function(value) {
      var q = $q.defer(), query = new Parse.Query('Settings');

      query.equalTo('name', 'weeksAvailable');
      query.first({
        success: function(weeksAvailable) {
          weeksAvailable.save({duration: value}, {
            success: function(result) {
              q.resolve(result);
            }
          });
        }
      });

      return q.promise;
    },

    visitDuration: function() {
      var q = $q.defer();

      Parse.Cloud.run('getDefaultVisitDuration').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },

    updateVisitDuration: function(value) {
      var q = $q.defer(), query = new Parse.Query('Settings');

      query.equalTo('name', 'visitDuration');
      query.first({
        success: function(visitDuration) {
          visitDuration.save({duration: value}, {
            success: function(result) {
              q.resolve(result);
            }
          });
        }
      });

      return q.promise;
    }
  };

});