'use strict';

describe('Controller: AdminPacientsCtrl', function () {

  // load the controller's module
  beforeEach(module('registrationApp'));

  var AdminPacientsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPacientsCtrl = $controller('AdminPacientsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminPacientsCtrl.awesomeThings.length).toBe(3);
  });
});
