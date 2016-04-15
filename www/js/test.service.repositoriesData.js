'use strict';

describe('service.repositoriesData test', function() {
	var repositoriesData;

	beforeEach(module('ghtrending.services'));
	beforeEach(function() {
		repositoriesData = UnitTestHelper.getService("repositoriesData");
		var data = UnitTestHelper.getTestRepoData("overall");
		repositoriesData.setRepositoriesData(data);
	});

	it('test getRepositoriesCount', function() {
		expect(repositoriesData.getRepositoriesCount()).toEqual(3);
	});

	it('test getRepositoriesDetails', function() {
		var items = repositoriesData.getRepositoriesDetails();
		expect(items.length).toEqual(3);
		expect(items[0].id).toEqual(1);
	});

	it('test getRepositoryById', function() {
		var repo = repositoriesData.getRepositoryById(2);
		expect(repo.full_name).toEqual("def");
	});


});