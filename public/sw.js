//using install service worker event..............?

const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
    "/",    
    "/chat.js",
    "/chatroom.html",
    "/chatspage.html",
    "/chatspage.js",
    "/index.html",
    "/index.js",    
    "/styles.css",    
    "/emojionearea.min.js", 
    "/emojionearea.min.css", 
    "https://code.jquery.com/jquery-3.6.0.min.js",                 
];

self.addEventListener("install", evt => {
    //console.log("service worker has been installed...");
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("caching shell assets");
            cache.addAll(assets);
       })
    );
});

//listen and use activate event

self.addEventListener("activate", evt => {
    //console.log("service worker has been activated");
    evt.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
                )
        })
    )
});

//listen for fetch event and add other pages to new cache as user browses

self.addEventListener("fetch", evt => {
    console.log("fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes
                })
            });
        })
    );
});