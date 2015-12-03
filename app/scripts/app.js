'use strict';

/**
 * @ngdoc overview
 * @name registrationApp
 * @description
 * # registrationApp
 *
 * Main module of the application.
 */
angular
  .module('registrationApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.calendar',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
    .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});