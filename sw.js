var CACHE_NAME = "yuyuyu-pwa-v1.0.2";

self.addEventListener("install", function(e) {
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {

      if (response) {
        return response;
      }

      return fetch(e.request).then(function(res) {

        // HTMLやCSS、JSなどだけ保存
        if (
          e.request.method === "GET" &&
          res.status === 200 &&
          (
            e.request.destination === "document" ||
            e.request.destination === "style" ||
            e.request.destination === "script" ||
            e.request.destination === "image"
          )
        ) {
          var clone = res.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }

        return res;
      });

    })
  );
});