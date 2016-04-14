angular.module('ghtrending.services', [])
	.factory('repositoriesService', function($q, $http) {

	    var ROOT_API = "https://api.github.com";
	    var REPO_SEARCH = ROOT_API + "/search/repositories";
	  
	    function processAjaxRequest(url) {
	        var deffered=$q.defer();
	        $http({
	            method: "get",
	            url: url,
	            headers: {
	            	Accept: "application/vnd.github.v3+json"
	            },

	        }).success(function(data) {
	            if (data) {
	                deffered.resolve(data);
	            } else {

	            }
	        }).error(function(error) {
	            deffered.reject(error);
	        });
	        return deffered.promise;
	    }

	    return {
	        getPopularRepositories: function(timeScale) {
	        	console.log(timeScale);
	            var url = REPO_SEARCH;
	            var searchDate = new Date();
	            var query;
	            if (timeScale == "overall") {
	            	searchDate.setYear(searchDate.getYear() - 1);
	            	query = "pushed:>" + searchDate.toISOString();
	            } else {
	            	if (timeScale == "weekly")
		              searchDate.setDate(searchDate.getDate() - 7);
		            else if (timeScale == "monthly")
		              searchDate.setMonth(searchDate.getMonth() - 1);
		            else if (timeScale == "yearly")
		              searchDate.setYear(searchDate.getYear() - 1);
		            query = "created:>" + searchDate.toISOString();
	            }
	            url += "?q="+query+"&sort=stars&order=desc";
	            return processAjaxRequest(url);
	        }
	    };
	})

	.service('repositoriesData', function() {
		var repoDetails = [];
		var repoCount = 0;
		
		this.setRepositoriesData = function(data) {
			repoDetails = data.items;
			repoCount = data.total_count;
		};

		this.getRepositoriesDetails = function() {
			return repoDetails;
		};

		this.getRepositoriesCount = function() {
			return repoCount;
		};

		this.getRepositoryById = function(id) {
			for (var i = 0; i < repoCount; i++) {
				if (repoDetails[i].id == id)
					return repoDetails[i];
			}
			return {};
		};
	});


;