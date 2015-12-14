'use strict';

/**
 * @ngdoc overview
 * @name registrationApp
 * @description
 * # registrationApp
 *
 * Main module of the application.
 */

Parse.initialize('e6AmDrs60orYS7vIW2oLHUp3GALstVH840srHFY8', 'HXFcOsfFQHN2m6ya9U1KRgRcv1xzpJumvh15Vllb');

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
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
    url: "/",
    templateUrl: "views/main.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
    .state('login', {
    url: "/login",
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
    .state('register', {
    url: "/register",
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
    .state('profile', {
    url: "/profile",
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile',
    params: {
      acl: true
    }
  });
})
  .run( function($rootScope, user, $state) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (!user.isLoggedIn()) {
      var acl = toParams.acl;

      if (acl) {
        event.preventDefault();
        $state.go('login');
      } 
      /*if (next.templateUrl !== 'views/login.html' && next.templateUrl !== 'views/register.html' && next.templateUrl !== 'views/main.html' && next.templateUrl !== 'views/reset_password.html') {
        $location.path('/user/login');
      }*/
    } else {/*
      user.isAdmin().then(function(result) {
        if (!result && next.templateUrl == "views/admin.html") {
          $location.path("/");
        }
      });
      if (next.templateUrl === 'views/login.html' || next.templateUrl === 'views/register.html') {
        $location.path('/user/profile');
      }*/
    }
  });
});