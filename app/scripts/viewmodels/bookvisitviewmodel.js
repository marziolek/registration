'use strict';

/**
 * @ngdoc service
 * @name registrationApp.bookVisitViewModel
 * @description
 * # bookVisitViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('bookVisitViewModel', function (user, service, visit, Flash, popup, $rootScope) {

  var BookVisitAPI = function() {};

  BookVisitAPI.prototype.popupData;
  BookVisitAPI.prototype.popupDataTime;
  BookVisitAPI.prototype.popupDataDayName;
  BookVisitAPI.prototype.popupDataDateRaw;
  BookVisitAPI.prototype.popupDataDate;

  BookVisitAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };

  BookVisitAPI.prototype.services = [];
  BookVisitAPI.prototype.getAllServices = function() {
    var self = this;

    service.getAllServices().then( function(result) {
      self.services = result;
    })
  };

  BookVisitAPI.prototype.currentUser = function() {
    return Parse.User.current().id;
  };

  BookVisitAPI.prototype.bookVisit = function(data) {
    var self = this;

    visit.bookVisit(data).then( function(result) {
      if (result.code) {
        var message = 'Wystąpił błąd.',
            flashClass = 'danger';
        var id = Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
        self.closePopup();
      } else {
        if (result) {
          var message = 'Wizyta została umówiona.',
              flashClass = 'success';
          
          // add event to calendar
          $rootScope.events.push([{className: "taken", start: result.attributes.date, end: result.attributes.date }]);
        } else {
          var message = 'Ten termin jest już zajęty. Proszę wybrać inny.',
              flashClass = 'danger';
        }
        var id = Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
        self.closePopup();
      }
    }, function(error) {
      var message = 'Wystąpił błąd.',
          flashClass = 'danger';
      var id = Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      self.closePopup();
    });
  };

  BookVisitAPI.prototype.confirmationBookVisitData;
  BookVisitAPI.prototype.confirmationBookVisit = function(data) {
    var self = this;

    self.confirmationBookVisitData = data;
    popup.show('sm', 'book.visit.confirmation.tpl.html', 'BookVisitCtrl', self.popupData);
  };

  BookVisitAPI.prototype.closePopup = function() {
    popup.cancel();
  };

  return new BookVisitAPI();

});
