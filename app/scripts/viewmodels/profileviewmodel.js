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

  ProfileAPI.prototype.phone = function() {
    return user.userPhone();
  };

  ProfileAPI.prototype.email = user.userEmail();

  ProfileAPI.prototype.isLoggedIn = function() {
    return user.isLoggedIn();
  };

  //ProfileAPI.prototype.textMessagesStatus = user.userIsTextMessages();
  ProfileAPI.prototype.textMessages = function() {
    return user.userIsTextMessages();
  };

  ProfileAPI.prototype.sendSMS = function() {
    var self = this,
        data = {
          from: 'Eco',
          to: self.profileData.phone,
          msg: 'Wiadomość testowa'
        },
        message, flashClass;

    loading.set();
    SMS.sendSMS(data).then( function(result) {
      loading.unset();

      if (result.list[0].error) {
        message = result.list[0].error;
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else if (result.list[0].id) {
        message = 'Wiadomość SMS została wysłana.';
        flashClass = 'success';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        message = 'Wystąpił problem...';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  ProfileAPI.prototype.isAdmin = false;
  ProfileAPI.prototype.checkIfAdmin = function() {
    var self = this;

    loading.set();
    user.isAdmin().then( function(result) {
      loading.unset();
      self.isAdmin = result;
    });
  };

  ProfileAPI.prototype.sendEmail = function(mailData) {
    var message, flashClass;

    loading.set();
    Mailing.sendEmail(mailData).then(function(result) {
      loading.unset();

      if (result.accepted[0]) {
        message = 'Wiadomość email została wysłana.';
        flashClass = 'success';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else if (result.rejected[0]) {
        message = result.rejected[0];
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        message = 'Wystąpił problem...';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
  };

  ProfileAPI.prototype.updateTextMessages = function(textMessages) {
    return user.setTextMessages(textMessages);
  };

  ProfileAPI.prototype.profileData = {
    phone: user.userPhone(),
    textMessages: user.userIsTextMessages()
  };

  ProfileAPI.prototype.updateProfile = function(profileData) {
    var message, flashClass, self = this;

    loading.set();
    user.updateProfile(profileData).then( function(result) {
      loading.unset();

      user.userDataRefresh().then( function(user) {
        self.profileData.phone = user.get('phone');
        self.profileData.textMessages = user.get('textMessages');
      });
      if (result.id) {
        message = 'Ustawienia zapisane';
        flashClass = 'success';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);

        user.userData();
      } else if (result.error) {
        message = result.error;
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      } else {
        message = 'Wystąpił problem...';
        flashClass = 'danger';
        Flash.create(flashClass, message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
      }
    });
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

  return new ProfileAPI();

});