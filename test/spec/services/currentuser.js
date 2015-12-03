'use strict';

describe('Service: currentUser', function () {

  // load the service's module
  beforeEach(module('rejestracjaTestApp'));

  // instantiate service
  var currentUser;
  beforeEach(inject(function (_currentUser_) {
    currentUser = _currentUser_;
  }));

  it('should do something', function () {
    expect(!!currentUser).toBe(true);
  });

});
