angular.module('ghtrending.controllers', [])


  .controller('AppCtrl', ["$scope", "$cordovaSocialSharing", function($scope, $cordovaSocialSharing) {

  	$scope.share = function() {
  		var appUrl = "https://play.google.com/store/apps/details?id=com.tekchup.ninjahub";
  		var message = "Hi, I would like you to try this awesome app!";
  		var subject = "Hi";
  		$cordovaSocialSharing
	    .share(message, subject, "", appUrl)
	    .then(function(result) {
	      console.log("Successfully shared the invite");
	    }, function(err) {
	      console.error("Error: An error occurred while sharing the invite.");
	    });
  	};

  }])

  .controller('HomeCtrl', ["$ionicTabsDelegate", function($ionicTabsDelegate) {
  }])

  .controller('FavoritesCtrl', ["$scope", "favorites", function($scope, favorites) {
      $scope.favorites = favorites.all(); 
      favorites.registerObserver(function() {
          $scope.favorites = favorites.all();
      });
  }])
;


