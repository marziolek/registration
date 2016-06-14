'use strict';

/**
 * @ngdoc service
 * @name registrationApp.profileViewModel
 * @description
 * # profileViewModel
 * Factory in the registrationApp.
 */
angular.module('registrationApp')
  .factory('profileViewModel', function (user, Mailing, visit, $filter, Flash, $location, $anchorScroll, SMS, loading) {

  var ProfileAPI = function() {};

  ProfileAPI.prototype.firstName = user.userFirstName();

  ProfileAPI.prototype.lastName = user.userLastName();

  ProfileAPI.prototype.phone = user.userPhone();

  ProfileAPI.prototype.email = user.userEmail();

  ProfileAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };

  ProfileAPI.prototype.textMessages = function() {
    return user.userIsTextMessages();
  };

  ProfileAPI.prototype.smsStatus = function() {
    console.log(user.userIsTextMessages());
  };

  ProfileAPI.prototype.sendSMS = function() {
    var self = this,
        data = {
          from: 'Informacja',
          to: self.phone,
          msg: 'Wiadomość testowa'
        };

    SMS.sendSMS(data).then( function(result) {
      console.log(result);
    });
  };

  ProfileAPI.prototype.sendEmail = function(mailData) {
    loading.set();
    Mailing.sendEmail(mailData).then(function(result) {
      loading.unset();
      console.log(result);
    });
  };

  ProfileAPI.prototype.updateTextMessages = function(textMessages) {
    return user.setTextMessages(textMessages);
  };

  ProfileAPI.prototype.visits = [];
  ProfileAPI.prototype.isMoreToLoad = true;
  ProfileAPI.prototype.getMyVisits = function(from) {
    var self = this;

    visit.getMyVisits(from).then( function(result) {
      self.visits = result[0];
      self.isMoreToLoad = result[1];
    }, function(error) {
      self.visits = error;
    });
  };

  ProfileAPI.prototype.countWeeksBack = 0;
  ProfileAPI.prototype.displayWeekFrom = moment().format('DD.MM.YYYY');
  ProfileAPI.prototype.prevWeekCount = 7;
  ProfileAPI.prototype.prevWeekVisits = function(counter) {
    var self = this,
        from = moment().subtract(self.prevWeekCount * counter, 'days');

    self.displayWeekFrom = from.format('DD.MM.YYYY');
    this.getMyVisits(from);
  };

  ProfileAPI.prototype.isVisitToday = function(date) {
    var now = moment().toDate(),
        nowFormatted = now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear(),
        dateFormatted = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

    if (nowFormatted === dateFormatted) {
      return 'dzisiaj';
    }
  };

  ProfileAPI.prototype.goToAnchor = function(hash) {
    $location.hash(hash);
    $anchorScroll.yOffset = 60;
    $anchorScroll();

    angular.element('#' + hash).addClass('anchor-highlight');
    setTimeout( function() {
      angular.element('#' + hash).removeClass('anchor-highlight');
    }, 2000);
  };

  ProfileAPI.prototype.cancelVisit = function(id) {
    loading.set();
    visit.cancelVisit(id).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result) {
          message = 'Wizyta została odwołana.';
          flashClass = 'success';

          angular.element('[data-item-id="' + id + '"]').addClass('canceled');
        } else {
          message = 'Wystąpił błąd.';
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  ProfileAPI.prototype.enableVisit = function(id) {
    loading.set();
    visit.enableVisit(id).then( function(result) {
      loading.unset();

      var message, flashClass;
      if (result.code) {
        message = 'Wystąpił błąd.';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        if (result.id) {
          message = 'Wizyta została przywrócona.';
          flashClass = 'success';

          angular.element('[data-item-id="' + id + '"]').removeClass('canceled');
        } else {
          message = result;
          flashClass = 'danger';
        }
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  ProfileAPI.prototype.jobTest = function() {
    loading.set();
    Parse.Cloud.run('JOBnotifyUpcomingVisit').then( function(result) {
      loading.unset();
      console.log(result);
    });
  };

  return new ProfileAPI();

});