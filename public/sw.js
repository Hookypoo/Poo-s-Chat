//using install service worker event

const staticCacheName = "site-static-v1";
const assets = [
    "/",    
    "/chat.js",
    "/index.html",
    "/styles.css",    
    "/emojionearea.min.js", 
    "/emojionearea.min.css", 
    "https://code.jquery.com/jquery-3.6.0.min.js",   
    "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.0/socket.io.js",
           
];

self.addEventListener("install", evt => {
    //console.log("service worker has been installed");
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
            // return Promise.all(keys
            //     .filter(key => key !== staticCacheName)
            //     .map(key => caches.delete(key))
            //     )
        })
    )
});

//listen for fetch event

self.addEventListener("fetch", evt => {
    console.log("fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});