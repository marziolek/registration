'use strict';

describe('Service: MailingText', function () {

  // load the service's module
  beforeEach(module('registrationApp'));

  // instantiate service
  var MailingText;
  beforeEach(inject(function (_MailingText_) {
    MailingText = _MailingText_;
  }));

  it('should do something', function () {
    expect(!!MailingText).toBe(true);
  });

});
