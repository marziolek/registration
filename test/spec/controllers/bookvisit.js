'use strict';

describe('Controller: BookVisitCtrl', function () {

  // load the controller's module
  beforeEach(module('registrationApp'));

  var BookVisitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookVisitCtrl = $controller('BookVisitCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BookVisitCtrl.awesomeThings.length).toBe(3);
  });
});
