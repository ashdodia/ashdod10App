angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
})


.controller('HomeCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {
    //var module
    var homeModules = ["news", "sport", "culture", "education", "religion", "square", "nights", "weekend", "business"]
    var adsModules = ["105", "101", "103" , "104" , "98"]
    var limit = 5
    var page = 1
    var featured = 0
    var remoteURL = "ads.ashdod10.co.il"
    $scope.items = []
    // still nedd to fix sucess and error functions as they are taken from SectionCtrl as is.
    $scope.successGetHomeContent = function (category, data) {
        $scope.items[category] = [];
        $scope.items[category] = data.items;
        //console.log(category + ": " + JSON.stringify(data.items, null, 4));
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

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.total = 100;
    var featured = 1;

    $scope.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };


    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount() - 1) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.total / $scope.itemsPerPage);
    };

    $scope.setPage = function (n) {
        if (n > 0 && n < $scope.pageCount()) {
            $scope.currentPage = n;
        }
    };

    $scope.$watch("currentPage", function (newValue, oldValue) {
        FeedService.getK2CategoryContent($stateParams.sectionId, $scope.itemsPerPage, newValue, featured, $scope.successGetSectionContent, $scope.errorGetSectionContent);
        $scope.total = Item.total();
    });

    $scope.goToContent = function (id) {
        $state.go('app.content', { contentId: id }); 
    };
})

.controller('K2ContentCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {

    $scope.item = null;
    var siteURL = "http://ashdod10.co.il/"
    $scope.successGetContentItem = function (data) {
        $scope.item = data;
        $scope.item.content = $scope.item.content.replace(/(src=\")(.*)(\")/gm, '$1'+siteURL+'$2$3');
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


