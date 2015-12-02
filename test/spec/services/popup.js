'use strict';

describe('Service: popup', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var popup;
  beforeEach(inject(function (_popup_) {
    popup = _popup_;
  }));

  it('should do something', function () {
    expect(!!popup).toBe(true);
  });

});
