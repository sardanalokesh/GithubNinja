angular.module('ghtrending.directives', [])
	.directive('repositoryList', ["$cordovaInAppBrowser", "loadMask", "$rootScope", "favorites",
		function($cordovaInAppBrowser, loadMask, $rootScope, favorites) {
		return {
			restrict: "E",
			templateUrl: "templates/repository-list.html",
			scope: {
				repositories: '='
			},
			controller: function($scope) {

				$scope.openRepository = function(url) {
			          var options = {
			            location: 'no',
			            clearcache: 'no',
			            toolbar: 'no'
			          };
			          $cordovaInAppBrowser.open(url, '_blank', options).then(function() {
			              console.log("Opening URL " + url);
			          }).catch(function(e) {
			              console.error("Error opening URL " + url + " : " + e);
			          });
			          $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {
			          		loadMask.show();
			          });
			          $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event) {
			          		loadMask.hide();
			          });
			      };

			      $scope.isFavorite = function(repo) {
			      		return favorites.contains(repo);
			      };

			      $scope.toggleFavorite = function(event, repo) {
			      		event.preventDefault();
			      		event.stopPropagation();
			      		if ($scope.isFavorite(repo))
			      			favorites.remove(repo);
			      		else
			      			favorites.add(repo);
			      };

			      $scope.getFavoriteIcon = function(repo) {
			      		if ($scope.isFavorite(repo))
			      			return "ion-ios-heart icon-assertive";
			      		else
			      			return "ion-ios-heart-outline";
			      };
			},
			link: function(scope, elem, attr, ctrl) {

			}
		};
	}])

	.directive("topProjects", ["repositoriesService", "repositoriesData", function(repositoriesService, repositoriesData){
		return {
			restrict: "E",
			templateUrl: "templates/top-projects.html",
			scope: {
				timeScale: "@",
				language: '='
			},
			controller: function($scope) {
				function fetchData() {
					repositoriesService.getPopularRepositories($scope.timeScale, $scope.language).then(function(data) {
				          repositoriesData.setRepositoriesData(data);
				          if (repositoriesData.getRepositoriesCount() > 0)
				            $scope.repositories = repositoriesData.getRepositoriesDetails();
				          else
				            $scope.repositories = [];
				      });
				}

				$scope.refreshList = fetchData;

			    $scope.$watch('language', fetchData);
			}
		};
	}]);