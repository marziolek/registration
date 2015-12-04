'use strict';

describe('Directive: registerDirective', function () {

  // load the directive's module
  beforeEach(module('registrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<register-directive></register-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the registerDirective directive');
  }));
});
