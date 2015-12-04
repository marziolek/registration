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
  });

});