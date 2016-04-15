'use strict';

describe('factory.repositories test', function() {
	var repositoriesService, httpBackend;

  	beforeEach(module('ghtrending.services'));
  	beforeEach(function() {
  		repositoriesService = UnitTestHelper.getService("repositoriesService");
  		httpBackend = UnitTestHelper.getService("$httpBackend");
  		UnitTestHelper.loadBackendForOverAll();
  		UnitTestHelper.loadBackendForMonthly();
  	});

	it('test getPopularRepositories for weekly', function() {
		var queryType = "";
		repositoriesService.getPopularRepositories("weekly")
			.then(function(data) {
				queryType = data.query_type;
			});
			httpBackend.flush();
			expect(queryType).toEqual("created");
			
	});

	it('test getPopularRepositories for overall', function() {
		var queryType = "";
		repositoriesService.getPopularRepositories("overall")
			.then(function(data) {
				queryType = data.query_type;
			});
			httpBackend.flush();
			expect(queryType).toEqual("pushed");
			
	});

});