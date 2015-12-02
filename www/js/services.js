angular.module('starter.services', [])

.factory('FeedService', function ($http) {

    var feeds = {
        news: "http://ashdod10.co.il/get/k2/items?cats=2",
        sport: "http://ashdod10.co.il/get/k2/items?cats=3",
        culture: "http://ashdod10.co.il/get/k2/items?cats=5",
        education: "http://ashdod10.co.il/get/k2/items?cats=17",
        religion: "http://ashdod10.co.il/get/k2/items?cats=18",
        square: "http://ashdod10.co.il/get/k2/items?cats=19",
        nights: "http://ashdod10.co.il/get/k2/items?cats=20",
        weekend: "http://ashdod10.co.il/get/k2/items?cats=21",
        business: "http://ashdod10.co.il/get/k2/items?cats=22",
        featured: "http://ashdod10.co.il/get/k2/items?cats=1"
    };

    var content = "http://ashdod10.co.il/get/k2/items?id="

    return {
        getK2CategoryContent: function (category, limit, page, successCallback, errorCallback) {
            
            $http.get(feeds[category] + "&limit=" + limit + "&page=" + page + "&time=" + Date.getTime)
            .success(function (data, status, headers, config) {
                successCallback(category, data);
            })
            .error(function (data, status, headers, config) {
                errorCallback(status);
            });
        },
        getK2ContentItem: function (id, successCallback, errorCallback) {
            $http.get(content + id + "&time=" + Date.getTime)
              .success(function (data, status, headers, config) {
                  successCallback(data);
              })
              .error(function (data, status, headers, config) {
                  errorCallback(status);
              });
        }
    }
});
