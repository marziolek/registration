'use strict';

describe('Service: registerviewmodel', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var registerviewmodel;
  beforeEach(inject(function (_registerviewmodel_) {
    registerviewmodel = _registerviewmodel_;
  }));

  it('should do something', function () {
    expect(!!registerviewmodel).toBe(true);
  });

});
