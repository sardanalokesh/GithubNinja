'use strict';

describe('directive.repositoryList test', function() {
	var httpBackend; 
	beforeEach(module('ngCordova'));
	beforeEach(module('ghtrending.services'));
	beforeEach(module('ghtrending.directives'));
	beforeEach(module("templates/repository-list.html"));

	beforeEach(function() {
		
		httpBackend = UnitTestHelper.getService("$httpBackend");
  		UnitTestHelper.loadBackendForOverAll();
  		UnitTestHelper.loadBackendForMonthly();
	});

	it('directive repositoryList should compile properly', function() {
		var element = UnitTestHelper.createDirective("<repository-list time-scale='monthly'></repository-list>");
		httpBackend.flush();
		expect(element.html()).toContain("ion-content");
	});

	it('directive repositoryList should contain repo list', function() {
		var element = UnitTestHelper.createDirective("<repository-list time-scale='monthly'></repository-list>");
		httpBackend.flush();
		var count = element.find("a").length;
		expect(count).toEqual(3);
	});

});