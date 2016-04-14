angular.module('ghtrending', ['ionic', 'ngCordova','ghtrending.controllers', 'ghtrending.services', 'ghtrending.directives'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.weekly', {
    url: '/weekly',
    views: {
      'tab-weekly': {
        templateUrl: 'templates/tab-weekly.html'
      }
    }
  })

  .state('tab.monthly', {
    url: '/monthly',
    views: {
      'tab-monthly': {
        templateUrl: 'templates/tab-monthly.html'
      }
    }
  })

  .state('tab.yearly', {
    url: '/yearly',
    views: {
      'tab-yearly': {
        templateUrl: 'templates/tab-yearly.html'
      }
    }
  })

  .state('tab.overall', {
    url: '/overall',
    views: {
      'tab-overall': {
        templateUrl: 'templates/tab-overall.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/weekly');

});
