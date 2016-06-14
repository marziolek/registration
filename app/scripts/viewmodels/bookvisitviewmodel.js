'use strict';

/**
 * @ngdoc service
 * @name registrationApp.bookVisitViewModel
 * @description
 * # bookVisitViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('bookVisitViewModel', function (user, service, visit, Flash, popup, $rootScope, Mailing, MailingText, loading) {

  var BookVisitAPI = function() {};

  BookVisitAPI.prototype.popupData = '';
  BookVisitAPI.prototype.popupDataTime = '';
  BookVisitAPI.prototype.popupDataDayName = '';
  BookVisitAPI.prototype.popupDataDateRaw = '';
  BookVisitAPI.prototype.popupDataDate = '';

  BookVisitAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };

  BookVisitAPI.prototype.services = [];
  BookVisitAPI.prototype.getAllServices = function() {
    var self = this;

    loading.set();
    service.getAllServices().then( function(result) {
      loading.unset();
      self.services = result;
    });
  };

  BookVisitAPI.prototype.currentUser = function() {
    return Parse.User.current().id;
  };

  BookVisitAPI.prototype.bookVisit = function(data) {
    var self = this,
        msgSubject = MailingText.subject().newVisit,
        msgDate = moment(data.date).format('LLLL'),
        msgBody = MailingText.body(msgDate).newVisitDate + MailingText.body().footer,
        msgEmail = '';

    if (Parse.User.current()) {
      msgEmail = Parse.User.current().get('email');
    } else {
      console.log(data);
      msgEmail = data.userOneTime.email;
    }

    loading.set();
    visit.bookVisit(data, {email: msgEmail, subject: msgSubject, body: msgBody}).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
        self.closePopup();
      } else {
        if (result) {
          message = 'Wizyta została umówiona.';
          flashClass = 'success';

          // add event to calendar
          $rootScope.allEvents.push([{className: 'taken', start: result.attributes.date, end: result.attributes.date }]);

        } else {
          message = 'Ten termin jest już zajęty. Proszę wybrać inny.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
        self.closePopup();
      }
    }, function() {
      loading.unset();

      var message = 'Wystąpił błąd.',
          flashClass = 'danger';
      Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      self.closePopup();
    });
  };

  BookVisitAPI.prototype.confirmationBookVisitData = '';
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
