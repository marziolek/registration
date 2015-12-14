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
      return currUser.get('phone');
    },
    userEmail: function() {
      return currUser.get('email');
    },
    userIsTextMessages: function() {
      return currUser.get('textMessages');
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

      Parse.Cloud.run('isVerified', {'email':email}).then(function(result){
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

        var q = $q.defer(),
            user = new Parse.User();
        
        user.set('email', form.email);
        user.set('username', form.email);
        user.set('firstName', form.name);
        user.set('lastName', form.lastname);
        user.set('password', form.password);
        user.set('phone', form.phone);
        user.set('textMessages', form.textMessages);

        user.signUp(null, {
          success: function(user) {
            q.resolve(user);
          },
          error: function(user, error) {
            q.reject(error);
          }
        });

        return q.promise;
      }
    },
    resendVerificationEmail: function(username) {
      var q = $q.defer();

      Parse.Cloud.run('resendVerificationEmail', {'username':username}).then(function(result){
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
    },
    setTextMessages: function(set) {
      var self = this;

      currUser.set('textMessages',set);
      self.saveUserData();
    },
    // save user data after setting properites
    saveUserData : function () {
      var self = this;

      currUser.save(null, {
        success: function(user) {
          self.userData();
        },
        error: function(user, error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
    /*
    getAlertFreeSpotFlag : function() {
      return currUser.get('f_alertFreeSpot');
    },

    getAlertDrawReminderFlag : function() {
      return currUser.get('f_alertDrawReminder');
    },

    getActiveInDrawFlag : function() {
      return currUser.get('f_activeInDraw');
    },

    getAllUsersForDraw : function() {
      var q = $q.defer();

      var User = Parse.Object.extend("User");
      var query = new Parse.Query(User);

      query.equalTo("f_activeInDraw", true);

      query.find({
        success: function(results) {
          q.resolve(results);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
      return q.promise;
    },

    // setting flags        
    setAlertFreeSpotFlag : function(status) {
      currUser.set("f_alertFreeSpot", status);
      this.saveUserData();
    },

    setAlertDrowReminderFlag : function(status) {
      currUser.set("f_alertDrawReminder", status);
      return this.saveUserData();
    },

    setActiveInDrawFlag : function(status) {
      console.log(status);
      currUser.set("f_activeInDraw", status);
      return this.saveUserData();
    }*/
  };
});