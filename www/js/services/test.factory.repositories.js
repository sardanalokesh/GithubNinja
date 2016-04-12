'use strict';

describe('factory.repositories test', function() {
	var repositoriesService, httpBackend, rootScope;

  	beforeEach(module('ghtrending.services'));
  	beforeEach(inject(function(_repositories_, $httpBackend, $rootScope) {
  		repositoriesService = _repositories_;
  		httpBackend = $httpBackend;
  		rootScope = $rootScope;
  	}));

	it('test getPopularRepositories', function() {
		var resultCount = 0;
		httpBackend.whenGET(/api\.github\.com\/search\/repositories\?(.+)/)
			.respond({
				total_count: 5
			});
		repositoriesService.getPopularRepositories("weekly")
			.then(function(data) {
				resultCount = data.total_count;
			});
			httpBackend.flush();
			expect(resultCount).toBeGreaterThan(0);
			
	});

});