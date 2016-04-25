angular.module('ghtrending.directives', [])
	.directive('repositoryList', ["repositoriesService", "repositoriesData", "$cordovaInAppBrowser", "loadMask", "$rootScope",
		function(repositoriesService, repositoriesData, $cordovaInAppBrowser, loadMask, $rootScope) {
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

			      fetchData();
			},
			link: function(scope, elem, attr, ctrl) {

			}
		};
	}]);