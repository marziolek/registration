'use strict';

describe('Service: mainViewModel', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var mainViewModel;
  beforeEach(inject(function (_mainViewModel_) {
    mainViewModel = _mainViewModel_;
  }));

  it('should do something', function () {
    expect(!!mainViewModel).toBe(true);
  });

});
