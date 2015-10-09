// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('eliteApp', ['ionic', 'angular-cache', 'uiGmapgoogle-maps'])

  .run(function($ionicPlatform, CacheFactory) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    CacheFactory("leagueDataCache", { storageMode: "localStorage", maxAge: 360000, deleteOnExpire: "aggressive" });
    CacheFactory("leaguesCache", { storageMode: "localStorage", maxAge: 360000, deleteOnExpire: "aggressive" });
    CacheFactory("myTeamsCache", { storageMode: "localStorage" });
    CacheFactory("staticCache", { storageMode: "localStorage" });
  })

  .constant('ApiEndpoint', {
    url: 'http://elite-schedule.net/api/leaguedata'
  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
          abstract: true,
          url: '/home',
          templateUrl: 'app/home/home.html'
        })
        .state('home.leagues', {
          url: '/leagues',
          views: {
            'tab-leagues':{
              templateUrl: 'app/home/leagues.html'
            }
          }
        })
        .state('home.myteams', {
          cache: false,
          url: '/myteams',
          views: {
            'tab-myteams':{
              templateUrl: 'app/home/myteams.html'
            }
          }
        })
      .state('app', {
        abstract: true,
        url: "/app",
        templateUrl: "app/layout/menu-layout.html"
      })
      .state('app.teams', {
        cache: false,
        url: "/teams",
        views: {
          'mainContent': {
            templateUrl: "app/teams/teams.html"
          }
        }
      })
      .state('app.team-detail', {
        url: "/teams/:id",
        views: {
          'mainContent': {
            templateUrl: "app/teams/team-detail.html"
          }
        }
      })
      .state('app.game', {
        url: "/game/:id",
        views: {
          'mainContent': {
            templateUrl: "app/game/game.html"
          }
        }
      })
      .state('app.standings', {
        url: "/standings",
        views: {
          'mainContent': {
            templateUrl: "app/standings/standings.html"
          }
        }
      })
      .state('app.locations', {
        cache: false,
        url: "/locations",
        views: {
          'mainContent': {
            templateUrl: "app/locations/locations.html"
          }
        }
      })
      .state('app.location-map', {
        url: "/location-map/:id",
        views: {
          'mainContent': {
            templateUrl: "app/locations/location-map.html"
          }
        }
      })
      .state('app.location-schedule', {
        url: "/location-schedule/:id",
        views: {
          'mainContent': {
            templateUrl: "app/locations/location-schedule.html"
          }
        }
      })
      .state('app.rules', {
        url: "/rules",
        views: {
          'mainContent': {
            templateUrl: "app/rules/rules.html",
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home/leagues');
  });
