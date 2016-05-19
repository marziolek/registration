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
      var q = $q.defer(), settings = Parse.Object.extend('settings'), query = new Parse.Query(settings);

      Parse.Cloud.run('getDefaultWeeksAvailable').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },

    updateWeeksAvailable: function(value) {
      var q = $q.defer(), settings = Parse.Object.extend('settings'), query = new Parse.Query(settings);

      query.equalTo('name', 'weeksAvailable');
      query.first({
        success: function(weeksAvailable) {
          weeksAvailable.save({duration: value}, {
            success: function(result) {
              console.log(value);
              q.resolve(result);
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);    
            }
          });
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);    
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
      var q = $q.defer(), settings = Parse.Object.extend('settings'), query = new Parse.Query(settings);

      query.equalTo('name', 'visitDuration');
      query.first({
        success: function(visitDuration) {
          visitDuration.save({duration: value}, {
            success: function(result) {
              console.log(value);
              q.resolve(result);
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);    
            }
          });
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);    
        }
      });

      return q.promise;
    }
  };

});