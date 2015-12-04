'use strict';

describe('Service: headerViewModel', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var headerViewModel;
  beforeEach(inject(function (_headerViewModel_) {
    headerViewModel = _headerViewModel_;
  }));

  it('should do something', function () {
    expect(!!headerViewModel).toBe(true);
  });

});
