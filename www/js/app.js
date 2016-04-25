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
        $ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to exit?'
        }).then(function(res){
          if( res ){
            navigator.app.exitApp();
          }
        });
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

  // setup an abstract state for the tabs directive
    .state('app.tab', {
    url: '/tab',
    abstract: true,
    views: {
      'menu-content': {
        templateUrl: 'templates/tabs.html',
        controller: 'TabsCtrl'
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('app.tab.weekly', {
    url: '/weekly',
    views: {
      'tab-weekly': {
        templateUrl: 'templates/tab-weekly.html'
      }
    }
  })

  .state('app.tab.monthly', {
    url: '/monthly',
    views: {
      'tab-monthly': {
        templateUrl: 'templates/tab-monthly.html'
      }
    }
  })

  .state('app.tab.yearly', {
    url: '/yearly',
    views: {
      'tab-yearly': {
        templateUrl: 'templates/tab-yearly.html'
      }
    }
  })

  .state('app.tab.overall', {
    url: '/overall',
    views: {
      'tab-overall': {
        templateUrl: 'templates/tab-overall.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tab/weekly');

});
