'use strict';

describe('Service: SMS', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var SMS;
  beforeEach(inject(function (_SMS_) {
    SMS = _SMS_;
  }));

  it('should do something', function () {
    expect(!!SMS).toBe(true);
  });

});
