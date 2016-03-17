'use strict';

/**
 * @ngdoc service
 * @name registrationApp.bookVisitViewModel
 * @description
 * # bookVisitViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('bookVisitViewModel', function (user, service, visit, Flash, popup) {

  var BookVisitAPI = function() {};

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
      if (result) {
        var message = 'Wizyta została umówiona.',
            flashClass = 'success';
      } else {
        var message = 'Ten termin jest już zajęty. Proszę wybrać inny.',
            flashClass = 'danger';
      }
      var id = Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
    }, function(error) {
      var message = 'Wystąpił błąd.',
          flashClass = 'danger';
      var id = Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  };

  BookVisitAPI.prototype.closePopup = function() {
    popup.cancel();
  };

  return new BookVisitAPI();

});
