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
        featured: "http://ashdod10.co.il/get/k2/items?"
    };

    var content = "http://ashdod10.co.il/get/k2/items?id="

    var remoteAd = "http://ashdod10.co.il/get/remoteads/getRemoteAd?zid="

    return {
        getK2CategoryContent: function (category, limit, page, featured, successCallback, errorCallback) {
            $http.get(feeds[category] + "&limit=" + limit + "&page=" + page + "&featured=" + featured, { cache: true })
               
            .success(function (data, status, headers, config) {
                //console.log("MYCONFIG: " + JSON.stringify($http.defaults.cache, null, 4))
                //console.log(feeds[category] + "&limit=" + limit + "&page=" + page + "&featured=" + featured)
                successCallback(category, data);
            })
            .error(function (data, status, headers, config) {
                errorCallback(status);
            });
        },
        getK2ContentItem: function (id, successCallback, errorCallback) {
            $http.get(content + id)
              .success(function (data, status, headers, config) {
                  successCallback(data);
              })
              .error(function (data, status, headers, config) {
                  errorCallback(status);
              });
        },
        getRemoteAd: function (zone, remoteURL, successCallback, errorCallback) {
            $http.get(remoteAd + zone + "&remoteURI=" + remoteURL + "&time=" + Math.random())
            .success(function (data, status, headers, config) {
                successCallback(zone, data);

            })
            .error(function (data, status, headers, config) {
                errorCallback(status);
              });
        }
    }
})


