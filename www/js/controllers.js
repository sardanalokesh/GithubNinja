angular.module('ghtrending.controllers', [])


  .controller('AppCtrl', ["$scope", "$cordovaSocialSharing", "$ionicPopover", "repositoriesService", function($scope, $cordovaSocialSharing, $ionicPopover, repositoriesService) {

  	$scope.share = function() {
  		var appUrl = "https://play.google.com/store/apps/details?id=com.tekchup.ninjagithub";
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

    $ionicPopover.fromTemplateUrl('templates/lang-filter.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.languages = ["All", "Javascript", "Java", "Python", "CSS", "PHP", "Ruby", "C++", "C", "Shell", "C#", "Objective-C", "R", "VimL", "GO", "Perl", "CoffeeScript", "TeX", "Swift", "Scala", "Emacs Lisp", "Haskell", "Lua", "Clojure", "Matlab", "Arduino", "Makefile", "Groovy", "Puppet", "Rust", "PowerShell"];
    $scope.selectedLanguage = "All";
    
    $scope.selectLanguage = function(lang) {
      $scope.selectedLanguage = lang;
      $scope.closePopover();
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


