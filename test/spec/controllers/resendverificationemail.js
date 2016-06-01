'use strict';

describe('Controller: ResendverificationemailCtrl', function () {

  // load the controller's module
  beforeEach(module('registrationApp'));

  var ResendverificationemailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResendverificationemailCtrl = $controller('ResendverificationemailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResendverificationemailCtrl.awesomeThings.length).toBe(3);
  });
});
