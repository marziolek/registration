'use strict';

describe('Service: ResendVerificationEmailViewModel', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var ResendVerificationEmailViewModel;
  beforeEach(inject(function (_ResendVerificationEmailViewModel_) {
    ResendVerificationEmailViewModel = _ResendVerificationEmailViewModel_;
  }));

  it('should do something', function () {
    expect(!!ResendVerificationEmailViewModel).toBe(true);
  });

});
