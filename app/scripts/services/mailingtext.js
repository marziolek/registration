'use strict';

/**
 * @ngdoc service
 * @name registrationApp.MailingText
 * @description
 * # MailingText
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('MailingText', function () {

  return {
    subject: function() {
      return {
        newVisit: 'Twoja wizyta została umówiona'
      };
    },

    body: function(param) {
      return {
        newVisitDate: '<p>Data wizyty: ' + param + '</p>',
        footer: '<br><p>__________</p><p>Specjalistyczna Praktyka Lekarska, Jarosław Downar-Zapolski</p><p>Bolesławiec, ul. Zgorzelecka 12, III piętro</p>'
      };
    }
  };
});
