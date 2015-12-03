angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
})


.controller('HomeCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {
    //var module
    var homeModules = ["news", "sport", "culture", "education", "religion", "square", "nights", "weekend", "business"]
    var adsModules = ["105"]
    var limit = 4
    var page = 1
    var featured = 0
    var remoteURL = "ads.ashdod10.co.il"
    $scope.items = []
    // still nedd to fix sucess and error functions as they are taken from SectionCtrl as is.
    $scope.successGetHomeContent = function (category, data) {
        $scope.items[category] = [];
        $scope.items[category] = data.items;
        console.log(category + ": " + JSON.stringify(data.items, null, 4));
    };

    $scope.successGetAdsContent = function (category, data) {
        $scope.items["ads" + category] = [];
        $scope.items["ads" + category] = data;
    };

    $scope.errorGetHomeContent = function (status) {
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error reading section content',
                template: 'Please check your network connection'
            });
            alertPopup.then(function (res) {
                console.log('Error reading section content');
            });
        };
        $scope.showAlert();
    };

    FeedService.getK2CategoryContent("featured", limit, page, 2, $scope.successGetHomeContent, $scope.errorGetHomeContent);
    angular.forEach(homeModules, function (value, key) {
        FeedService.getK2CategoryContent(value, limit, page, featured, $scope.successGetHomeContent, $scope.errorGetHomeContent);
    });

    angular.forEach(adsModules, function (value, key) {
         FeedService.getRemoteAd(value, remoteURL, $scope.successGetAdsContent, $scope.errorGetHomeContent);
    });

    $scope.goToContent = function (id) {
        $state.go('app.content', { contentId: id });
    };

})

.controller('K2CategoryCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {
    $scope.items = [];
    $scope.successGetSectionContent = function (category, data) {
        $scope.items = data.items;
        console.log("CATEGORY: " + category);
        console.log("DATA: " + data);
    };
    $scope.errorGetSectionContent = function (status) {
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error reading section content',
                template: 'Please check your network connection'
            });
            alertPopup.then(function (res) {
                console.log('Error reading section content');
            });
        };
        $scope.showAlert();
    };
    var limit = 10;
    var page = 1;
    FeedService.getK2CategoryContent($stateParams.sectionId, limit, page, $scope.successGetSectionContent, $scope.errorGetSectionContent);

    $scope.goToContent = function (id) {
        $state.go('app.content', { contentId: id });
    };
})

.controller('K2ContentCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {

    $scope.item = null;

    $scope.successGetContentItem = function (data) {
        $scope.item = data;
    };

    $scope.errorGetContentItem = function (status) {
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error reading content item',
                template: 'Please check your network connection'
            });
            alertPopup.then(function (res) {
                console.log('Error reading content item');
            });
        };
        $scope.showAlert();
    };

    FeedService.getK2ContentItem($stateParams.contentId, $scope.successGetContentItem, $scope.errorGetContentItem);
});


