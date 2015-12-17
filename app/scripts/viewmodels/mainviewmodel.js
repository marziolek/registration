'use strict';

/**
 * @ngdoc service
 * @name registrationApp.mainViewModel
 * @description
 * # mainViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('mainViewModel', function (settings) {
    
  var MainAPI = function() {};
  
  MainAPI.prototype.weeksAvailable;
  MainAPI.prototype.getWeeksAvailable = function() {
    var self = this;

    settings.weeksAvailable().then( function(result) {
      self.weeksAvailable = result.attributes.duration;
    });
  };

  return new MainAPI();
  
  });
