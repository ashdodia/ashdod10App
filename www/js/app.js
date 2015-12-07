// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.services', 'starter.controllers', 'starter.cache'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        var push = new Ionic.Push({
            "debug": true
        });

        push.register(function (token) {
            console.log("Device token:", token.token);
        });

        var dialogBody = parent.document.getElementById("exec-dialog");
        var overlay = parent.document.querySelector(".ui-widget-overlay");
        var ngDialog = angular.element(dialogBody.parentElement);
        var ngOverlay = angular.element(overlay);
        var hideRules = { "height": "0px", "width": "0px", "display": "none" };
        ngDialog.css(hideRules); // hide annoying popup
        ngOverlay.css(hideRules); // hide annoying popup's backdrop
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //if (window.cordova && window.cordova.plugins.Keyboard) {
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //}
        //if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            //StatusBar.styleDefault();
        //}
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.sections', {
        url: "/sections/:sectionId",
        views: {
            'menuContent': {
                templateUrl: "templates/sections.html",
                controller: 'K2CategoryCtrl'
            }
        }
    })

    .state('app.content', {
        url: "/content/:contentId",
        views: {
            'menuContent': {
                templateUrl: "templates/content.html",
                controller: 'K2ContentCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
