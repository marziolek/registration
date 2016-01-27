'use strict';

describe('Service: day', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var day;
  beforeEach(inject(function (_day_) {
    day = _day_;
  }));

  it('should do something', function () {
    expect(!!day).toBe(true);
  });

});
