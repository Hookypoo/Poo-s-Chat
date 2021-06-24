//using install service worker event

self.addEventListener("install", evt => {
    console.log("service worker has been installed");
});

//listen and use activate event

self.addEventListener("activate", evt => {
    console.log("service worker has been activated");
});

//listen for fetch event

self.addEventListener("fetch", evt => {
    console.log("fetch event", evt);
});