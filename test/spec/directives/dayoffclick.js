'use strict';

describe('Directive: dayOffClick', function () {

  // load the directive's module
  beforeEach(module('registrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<day-off-click></day-off-click>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dayOffClick directive');
  }));
});
