var UnitTestHelper = {};
		
UnitTestHelper.getTestRepoData = function(timeScale) {
	var data = {
		query_type: timeScale == "overall" ? "pushed" : "created",
		total_count: 3,
	  	incomplete_results: false,
	  	items: [{
	  		id: 1,
	  		html_url: "abc.com",
	  		full_name: "abc",
	  		description: "abc desc",
	  		stargazers_count: 2,
	  		forks_count: 3,
	  		owner: {
	  			avatar_url: "abc_avatar"
	  		}
	  	}, {
	  		id: 2,
	  		html_url: "def.com",
	  		full_name: "def",
	  		description: "def desc",
	  		stargazers_count: 4,
	  		forks_count: 1,
	  		owner: {
	  			avatar_url: "def_avatar"
	  		}
	  	}, {
	  		id: 3,
	  		html_url: "ghi.com",
	  		full_name: "ghi",
	  		description: "ghi desc",
	  		stargazers_count: 1,
	  		forks_count: 1,
	  		owner: {
	  			avatar_url: "ghi_avatar"
	  		}
	  	}]
	};
	return data;
};


UnitTestHelper.getService = function (serviceName) {
	 var service;
	 inject(function ($injector) {
	 	service = $injector.get(serviceName);
	 });
	 return service;
};

UnitTestHelper.createDirective = function (template) {
	 var elem;
	 inject(function ($compile, $rootScope) {
	   elem = $compile(template)($rootScope);
	   $rootScope.$digest();
	 });
	 return elem;
};

UnitTestHelper.loadBackendForOverAll = function() {
	var httpBackend = this.getService("$httpBackend");
	var data = this.getTestRepoData("overall");
	httpBackend.whenGET(/api\.github\.com\/search\/repositories\?q=pushed(.+)/)
		.respond(data);
};

UnitTestHelper.loadBackendForMonthly = function() {
	var httpBackend = this.getService("$httpBackend");
	var data = this.getTestRepoData("monthly");
	httpBackend.whenGET(/api\.github\.com\/search\/repositories\?q=created(.+)/)
		.respond(data);

};