'use strict';

describe('Service: serviceViewModel', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var serviceViewModel;
  beforeEach(inject(function (_serviceViewModel_) {
    serviceViewModel = _serviceViewModel_;
  }));

  it('should do something', function () {
    expect(!!serviceViewModel).toBe(true);
  });

});
