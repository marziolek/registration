'use strict';

describe('Controller: ReservationsCtrl', function () {

  // load the controller's module
  beforeEach(module('registrationApp'));

  var ReservationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReservationsCtrl = $controller('ReservationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReservationsCtrl.awesomeThings.length).toBe(3);
  });
});
