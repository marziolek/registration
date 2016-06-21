'use strict';

/**
 * @ngdoc service
 * @name registrationApp.adminDaysOffViewModel
 * @description
 * # adminDaysOffViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('adminDaysOffViewModel', function (service, loading, Flash) {

  var AdminDaysOffAPI = function() {};

  AdminDaysOffAPI.prototype.date = new Date();

  AdminDaysOffAPI.prototype.today = function() {
    var self = this;
    self.date = new Date();
  };

  AdminDaysOffAPI.prototype.addDayOff = function(date) {
    var self= this;
    
    loading.set();
    service.addDayOff(date).then( function(result) {
      loading.unset();
      var message, flashClass;
      if (result.code) {
        message = result.message;
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Dzień wolny został dodany.';
          flashClass = 'success';
          self.getAllDaysOff();
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  AdminDaysOffAPI.prototype.removeDayOff = function(date) {
    var self = this;
    
    loading.set();
    service.removeDayOff(date).then( function(result) {
      loading.unset();
      var message, flashClass;
      if (result.code) {
        message = result.message;
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Dzień wolny został usunięty.';
          flashClass = 'success';
          self.getAllDaysOff();
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  AdminDaysOffAPI.prototype.daysOff = [];
  AdminDaysOffAPI.prototype.getAllDaysOff = function() {
    var self = this;

    loading.set();
    service.getAllDaysOff().then( function(result) {
      loading.unset();
      self.daysOff = result;
    });
  };
  
  AdminDaysOffAPI.prototype.removeBtnVisible = false;

  return new AdminDaysOffAPI();

});
