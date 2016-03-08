'use strict';

describe('Service: visit', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var visit;
  beforeEach(inject(function (_visit_) {
    visit = _visit_;
  }));

  it('should do something', function () {
    expect(!!visit).toBe(true);
  });

});
