angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    //// Form data for the login modal
    //$scope.loginData = {};

    //// Create the login modal that we will use later
    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //    scope: $scope
    //}).then(function (modal) {
    //    $scope.modal = modal;
    //});

    //// Triggered in the login modal to close it
    //$scope.closeLogin = function () {
    //    $scope.modal.hide();
    //};

    //// Open the login modal
    //$scope.login = function () {
    //    $scope.modal.show();
    //};

    //// Perform the login action when the user submits the login form
    //$scope.doLogin = function () {
    //    console.log('Doing login', $scope.loginData);

    //    // Simulate a login delay. Remove this and replace with your login
    //    // code if using a login system
    //    $timeout(function () {
    //        $scope.closeLogin();
    //    }, 1000);
    //};.


})


.controller('HomeCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {
    //var module
    var homeModules = ["news", "sport", "culture", "featured" , "education" , "religion" , "square" , "nights" , "weekend" , "business"]
    var limit = 4
    var page = 1
    $scope.items = []


    // still nedd to fix sucess and error functions as they are taken from SectionCtrl as is.
    $scope.successGetHomeContent = function (category, data) {
        $scope.items[category] = [];
        $scope.items[category] = data.items;
        for (var i = 0; i < $scope.items[category].length; i++) {
            $scope.items[category][i].content = $scope.items[category][i].content.replace(/<[^>]+>/gm, '');
            if ($scope.items[category][i].content.length > $scope.maxIntro) {
                $scope.items[category][i].content = $scope.items[category][i].content.substr(0, $scope.maxIntro) + '...';
            }
        }
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

    angular.forEach(homeModules, function (value, key) {
        FeedService.getK2CategoryContent(value, limit, page, $scope.successGetHomeContent, $scope.errorGetHomeContent);
    });
    //for (homeModule of homeModules) {
   //     FeedService.getK2CategoryContent(module, limit, page, $scope.successGetHomeContent, $scope.errorGetHomeContent);
    //};
    //console.log("==================================================================")
    //console.log(DumpObjectIndented($scope.items))
    //console.log("==================================================================")

    $scope.goToContent = function (id) {
        $state.go('app.content', { contentId: id });
    };

})

.controller('SectionsCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {
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


