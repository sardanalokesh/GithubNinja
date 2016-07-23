angular.module('ghtrending.services', [])
	.factory('repositoriesService', ["$q", "$http", "loadMask", function($q, $http, loadMask) {

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
	            	deffered.reject("No data");
	            }
	        }).error(function(error) {
	            deffered.reject(error);
	        });
	        deffered.promise.then(function() {
	        	loadMask.hide();
	        }).catch(function() {
	        	loadMask.hide();
	        });
	        return deffered.promise;
	    }

	    return {
	        getPopularRepositories: function(timeScale, language) {
	        	loadMask.show();
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

	            if (language && language != 'All')
	            	url += "?q="+query+"+language:"+language.toLowerCase()+"&sort=stars&order=desc";
	            else
	            	url += "?q="+query+"&sort=stars&order=desc";
	            return processAjaxRequest(url);
	        }
	    };
	}])

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
	})

	.service('loadMask', ["$ionicLoading", function($ionicLoading) {
		this.show = function() {
			$ionicLoading.show({
		      template: '<ion-spinner class="spinner-dark"></ion-spinner>'
		    });
		};

		this.hide = function() {
			$ionicLoading.hide();
		};
	}])

	.service("favorites", [function() {

		//initial local storage list if it does not exist already
		if (!localStorage.getItem("favoriteRepos"))
			localStorage.setItem("favoriteRepos", angular.toJson({}));

		var favorites = getAll();
		var observerCallbacks = [];

		var notifyObservers = function() {
		    angular.forEach(observerCallbacks, function(callback){
		      callback();
		    });
		};

		function getAll() {
			var favoritesString = localStorage.getItem("favoriteRepos");
			return angular.fromJson(favoritesString);
		};

		function save() {
			var favoritesString = angular.toJson(favorites);
			localStorage.setItem("favoriteRepos", favoritesString);
			notifyObservers();
		}

		//get the complete list of all favorite repositories
		this.all = getAll;

		//add a repository in favorites
		this.add = function(repo) {
			var repoDetails = {
				id: repo.id,
				html_url: repo.html_url,
				owner: {
					avatar_url: repo.owner.avatar_url
				},
				full_name: repo.full_name,
				description: repo.description,
				stargazers_count: repo.stargazers_count,
				forks_count: repo.forks_count,
			};
			favorites[repo.id] = repoDetails;
			save();
		};

		this.contains = function(repo) {
			return !!favorites[repo.id];
		};

		this.remove = function(repo) {
			if (this.contains(repo)) {
				delete favorites[repo.id];
				save();
			}
		};

		this.registerObserver = function(callback){
		    observerCallbacks.push(callback);
		};


	}])


	;