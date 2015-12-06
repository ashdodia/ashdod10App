angular.module('starter.cache', ['angular-cache'])

    .config(function (CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {
            maxAge: 3600000,
            deleteOnExpire: 'aggressive',
            onExpire: function (key, value) {
                var _this = this; // "this" is the cache in which the item expired
                angular.injector(['ng']).get('$http').get(key).success(function (data) {
                    _this.put(key, data);
                });
            }
        });
    })

.run(function ($http, CacheFactory) {
    $http.defaults.cache = CacheFactory('defaultCache', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        onExpire: function (key, value) {
        $http.get(key).success(function (data) {
            defaultCache.put(key, data);
        });
    }

    });
});



