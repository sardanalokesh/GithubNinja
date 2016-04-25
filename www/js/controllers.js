angular.module('ghtrending.controllers', [])


  .controller('AppCtrl', ["$scope", "$cordovaSocialSharing", function($scope, $cordovaSocialSharing) {

  	$scope.share = function() {
  		var appUrl = "https://play.google.com/store/apps/details?id=com.tekchup.scrumcards";
  		var message = "Hi, I would like you try this awesome app!";
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

  .controller('TabsCtrl', ["$ionicTabsDelegate", function($ionicTabsDelegate) {
  }]);


