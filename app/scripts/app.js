'use strict';

/**
 * @ngdoc overview
 * @name registrationApp
 * @description
 * # registrationApp
 *
 * Main module of the application.
 */

Parse.initialize('12345', '12345');
Parse.serverURL = 'http://marcin-ziolek.usermd.net/parse';

angular
  .module('registrationApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ui.router',
  'ngSanitize',
  'ngTouch',
  'ui.calendar',
  'ui.bootstrap',
  'ui.sortable',
  'ngFlash'
])
  .config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
    .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
    .state('forgotPassword', {
    url: '/forgot-password',
    templateUrl: 'views/forgot-password.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
    .state('resendVerificationEmail', {
    url: '/resend-verification-email',
    templateUrl: 'views/resend-verification-email.html',
    controller: 'ResendVerificationEmailCtrl',
    controllerAs: 'resendVerificationEmail'
  })
    .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
    .state('profile', {
    url: '/profile',
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile',
    params: {
      acl: true
    }
  })
    .state('profileVisits', {
    url: '/profile/visits',
    templateUrl: 'views/profile-visits.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile',
    params: {
      acl: true
    }
  })
    .state('admin', {
    url: '/admin',
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl',
    controllerAs: 'admin',
    params: {
      acl: true,
      admin: true
    }
  })
    .state('reservations', {
    url: '/admin/reservations',
    templateUrl: 'views/admin-reservations.html',
    controller: 'AdminCtrl',
    controllerAs: 'admin',
    params: {
      acl: true,
      admin: true
    }
  });
})
  .run( function($rootScope, user, $state) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

    if (!user.isLoggedIn()) {
      if (toParams.acl) {
        event.preventDefault();
        $state.go('login');
      }
    } else {
      if (toParams.admin) {
        user.isAdmin().then(function(result) {
          if (!result) {
            event.preventDefault();
            $state.go('profile');
          }
        });
      }
    }
  });
});