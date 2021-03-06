'use strict';

/**
 * @ngdoc service
 * @name registrationApp.user
 * @description
 * # user
 * Service in the registrationApp.
 */
angular.module('registrationApp')
  .service('user', function ($q, $rootScope) {

  var currUser = Parse.User.current(), isLogged;

  return {
    userData: function () {
      Parse.User.current().fetch().then( function(user) {
        currUser = user;

        return currUser;        
      });
    },
    isLoggedIn: function() {
      if (currUser) {
        isLogged = true;
      } else {
        isLogged = false;
      }
      return isLogged;
    },
    logOut: function() {
      var q = $q.defer();

      Parse.User.logOut().then( function(result) {
        $rootScope.isLoading = true;

        currUser = null;
        q.resolve(result);
      });

      return q.promise;
    },
    userFirstName: function() {
      return currUser.get('firstName');        
    },
    userLastName: function() {
      return currUser.get('lastName');
    },
    userPhone: function() {
      var phone = currUser.get('phone');

      if (!phone) {
        phone = '';
      }

      return phone;
    },
    userEmail: function() {
      return currUser.get('email');
    },
    userIsTextMessages: function() {
      var textMessages = currUser.get('textMessages');

      if (!textMessages) {
        textMessages = false;
      }

      return textMessages;
    },
    userDataRefresh: function () {
      var q = $q.defer();

      Parse.User.current().fetch().then( function(user) {
        q.resolve(user);        
      });

      return q.promise;
    },
    isAdmin: function() {
      var q = $q.defer();

      Parse.Cloud.run('isAdmin').then(function(result){
        q.resolve(result);
      });

      return q.promise;
    },
    isVerified: function(email) {
      var q = $q.defer();

      Parse.Cloud.run('isVerified', {email: email}).then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);
      });

      return q.promise;
    },
    sendResetEmail: function(email) {     
      var q = $q.defer();

      Parse.User.requestPasswordReset(email).then(function(result) {
        q.resolve(result);
      }, function(error) {
        q.reject(error.message);
      });

      return q.promise;
    },
    logIn: function(email, pass) {
      var q = $q.defer(),
          self = this;

      Parse.User.logIn(email, pass).then(function(result) {
        self.userData();
        q.resolve(result);
      }, function(error) {
        q.reject(error.message);
      });

      return q.promise;
    },
    signUp: function(form) {
      if (form.email !== '' && form.email !== null && form.name !== '' && form.name !== null && form.lastname !== '' && form.lastname !== null && form.password !== '' && form.password !== null ) {

        var q = $q.defer();

        Parse.Cloud.run('newAccount', {form: form}).then(function(result){
          q.resolve(result);
        });

        return q.promise;
      }
    },
    resendVerificationEmail: function(email) {
      var q = $q.defer();

      Parse.Cloud.run('resendVerificationEmail', {email: email}).then(function(result){
        q.resolve(result);
      });

      return q.promise;
    },
    mailMe: function(email) {
      var q = $q.defer();

      Parse.Cloud.run('mailMe', {'email':email}).then(function(result){
        q.resolve(result);
      }, function(error) {
        q.reject(error);   
      });

      return q.promise;
    },/*
    setTextMessages: function(set) {
      var self = this;

      currUser.set('textMessages',set);
      self.saveUserData();
    },
    // save user data after setting properites
    saveUserData : function () {
      var self = this;

      currUser.save(null, {
        success: function() {
          self.userData();
        }
      });
    },*/
    updateProfile: function(profileData) {
      var q = $q.defer();

      Parse.Cloud.run('updateProfile', {userId: currUser.id, profileData: profileData}).then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },
    resetPasswordEmail: function(email) {
      var q = $q.defer();

      Parse.Cloud.run('resetPasswordEmail', {email: email}).then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },
    getAllPatients: function() {
      var q = $q.defer();

      Parse.Cloud.run('getAllPatients').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    },
    addUserAdmin: function() {
      var q = $q.defer();

      Parse.Cloud.run('addUserAdmin').then( function(result) {
        q.resolve(result);
      });

      return q.promise;
    }

  };
});