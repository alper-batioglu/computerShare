const PRECACHE = 'precache-v6';
const RUNTIME = 'runtime';



console.log("sworker");




// A list of local resources we always want to be cached. 
const PRECACHE_URLS = [
    'index.html',
    './', // Alias for index.html
    //   'styles.css',
    //   '../../styles/main.css',
    // 'demo.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    console.log("install");
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    console.log("activate");

    const currentCaches = [PRECACHE, RUNTIME];
    // event.waitUntil(
    //     caches.keys().then(cacheNames => {
    //         return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    //     }).then(cachesToDelete => {
    //         return Promise.all(cachesToDelete.map(cacheToDelete => {
    //             return caches.delete(cacheToDelete);
    //         }));
    //     }).then(() => self.clients.claim())
    // );
    event.waitUntil(caches.keys().then(() => self.clients.claim()));


    //Obtain an array of Window client objects
    self.clients.matchAll({type:"window"}).then(function (clients) {
        console.log(clients);
        if (clients && clients.length) {
            //Respond to last focused tab
            clients.forEach((client, i) => {console.log(i);client.postMessage({ type: 'hadi' });} );
        }
    });
});

function substract(str1, str2){
    var str2Index = str1.indexOf(str2);
    if (str2Index < -1){return str1;}

    return str1.substring(str2Index + str2.length);
}

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    console.log("fetch", event.request.url);
    // Skip cross-origin requests, like those for Google Analytics.
    
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    console.log("cached response", event.request.url);
                    return cachedResponse;
                }
                
                return caches.open(RUNTIME).then(cache => {
                    console.log("real req: ", event.request.url);
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MESSAGE_IDENTIFIER') {

    }
});





//izole örnek
// var myBlob = new Blob(["body datasf sddgdgdg fdg fd gdf"]);
//         var init = { status : 200 , statusText : "MyOk5!", headers:{"Content-Length": "body datasf sddgdgdg fdg fd gdf".length, "content-type": "text/html"} };
//         var myResponse = new Response(myBlob,init);
// caches.open("alper").then(alperCache => { alperCache.put("b", myResponse)})


// fetch("/b").then(resp => resp.text().then(text =>console.log(text)))