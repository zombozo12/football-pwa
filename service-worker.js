const CACHE_NAME = 'football-pwa-v12'
const CACHED_URLS = [
    '/index.html',
    '/nav.html',

    // icons
    '/assets/img/icons/apple-icon-57x57.png',
    '/assets/img/icons/apple-icon-60x60.png',
    '/assets/img/icons/apple-icon-72x72.png',
    '/assets/img/icons/apple-icon-76x76.png',
    '/assets/img/icons/apple-icon-114x114.png',
    '/assets/img/icons/apple-icon-120x120.png',
    '/assets/img/icons/apple-icon-144x144.png',
    '/assets/img/icons/apple-icon-152x152.png',
    '/assets/img/icons/apple-icon-180x180.png',
    '/assets/img/icons/android-icon-192x192.png',
    '/assets/img/icons/favicon-32x32.png',
    '/assets/img/icons/favicon-96x96.png',
    '/assets/img/icons/favicon-16x16.png',

    // css
    '/node_modules/materialize-css/dist/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",

    // scripts
    '/node_modules/materialize-css/dist/js/materialize.min.js',
    '/node_modules/idb/lib/idb.js',
    '/assets/js/nav.js',
    '/assets/js/db.js',
    '/assets/js/master.js',
    '/assets/js/api.js',
    '/assets/js/fcm-config.js'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Worker: cache installed')
            return cache.addAll(CACHED_URLS)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(async function () {
        const cache = await caches.open(CACHE_NAME);
        const cache_response = await cache.match(event.request);
        if (cache_response) return cache_response;
        const network_response = await fetch(event.request, {
            headers: {
                'X-Auth-Token': 'acc36affa0d04e94b97655c93a0856c9'
            }
        });
        event.waitUntil(
            cache.put(event.request, network_response.clone())
        );
        return network_response;
    }());
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.map(name => {
                    if(name !== CACHE_NAME){
                        console.log(`Worker: ${name} deleted`)
                        return caches.delete(name)
                    }
                })
            )
        })
    )
})

self.addEventListener('push', e => {
    let body, options

    if(e.data){
        body = e.data.text()
    }else{
        body = 'Push Notification Message'
    }

    options = {
        body: body,
        icon: '/assets/img/icons/android-icon-192x192.png',
        vibrate: [300, 50, 50],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})
