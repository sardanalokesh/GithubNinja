angular.module('ghtrending', ['ionic', 'ngCordova','ghtrending.controllers', 'ghtrending.services', 'ghtrending.directives'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //exit app on back button
    $ionicPlatform.onHardwareBackButton(function () {
        navigator.app.exitApp();
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.favorites', {
    url: '/favorites',
    views: {
      'menu-content': {
        templateUrl: 'templates/favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  // setup an abstract state for the home
    .state('app.home', {
    url: '/home',
    abstract: true,
    views: {
      'menu-content': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('app.home.weekly', {
    url: '/weekly',
    views: {
      'home-weekly': {
        templateUrl: 'templates/home-weekly.html'
      }
    }
  })

  .state('app.home.monthly', {
    url: '/monthly',
    views: {
      'home-monthly': {
        templateUrl: 'templates/home-monthly.html'
      }
    }
  })

  .state('app.home.yearly', {
    url: '/yearly',
    views: {
      'home-yearly': {
        templateUrl: 'templates/home-yearly.html'
      }
    }
  })

  .state('app.home.overall', {
    url: '/overall',
    views: {
      'home-overall': {
        templateUrl: 'templates/home-overall.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home/weekly');

});
