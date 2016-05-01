angular.module('ghtrending.directives', [])
	.directive('repositoryList', ["repositoriesService", "repositoriesData", "$cordovaInAppBrowser", "loadMask", "$rootScope", "favorites",
		function(repositoriesService, repositoriesData, $cordovaInAppBrowser, loadMask, $rootScope, favorites) {
		return {
			restrict: "E",
			templateUrl: "templates/repository-list.html",
			scope: {
				timeScale: "@"
			},
			controller: function($scope) {
				function fetchData() {
					repositoriesService.getPopularRepositories($scope.timeScale).then(function(data) {
				          repositoriesData.setRepositoriesData(data);
				          if (repositoriesData.getRepositoriesCount() > 0)
				            $scope.repositories = repositoriesData.getRepositoriesDetails();
				          else
				            $scope.repositories = [];
				      });
				}

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
			          /*$rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {
			          		loadstart.show();
			          });
			          $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event) {
			          		loadstart.hide();
			          });*/
			      };

			      $scope.refreshList = function() {
			      		fetchData();
			      };

			      $scope.isFavorite = function(repoId) {
			      		$scope.favorites = favorites.getAll();
			      		return ($scope.favorites.indexOf(repoId) != -1);
			      };

			      $scope.toggleFavorite = function(event, repoId) {
			      		event.preventDefault();
			      		event.stopPropagation();
			      		if ($scope.isFavorite(repoId))
			      			favorites.remove(repoId);
			      		else
			      			favorites.add(repoId);
			      };

			      $scope.getFavoriteIcon = function(repoId) {
			      		if ($scope.isFavorite(repoId))
			      			return "ion-ios-heart icon-assertive";
			      		else
			      			return "ion-ios-heart-outline";
			      };

			      fetchData();
			},
			link: function(scope, elem, attr, ctrl) {

			}
		};
	}]);