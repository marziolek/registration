'use strict';

describe('Service: loginViewModel', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var loginViewModel;
  beforeEach(inject(function (_loginViewModel_) {
    loginViewModel = _loginViewModel_;
  }));

  it('should do something', function () {
    expect(!!loginViewModel).toBe(true);
  });

});
