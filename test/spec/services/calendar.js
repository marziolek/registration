'use strict';

describe('Service: calendar', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var calendar;
  beforeEach(inject(function (_calendar_) {
    calendar = _calendar_;
  }));

  it('should do something', function () {
    expect(!!calendar).toBe(true);
  });

});
