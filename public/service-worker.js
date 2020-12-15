importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const CACHED_URLS = [
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },

    // icons
    { url: '/assets/img/icons/apple-icon-57x57.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-60x60.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-72x72.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-76x76.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-114x114.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-120x120.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-144x144.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-152x152.png', revision: '1' },
    { url: '/assets/img/icons/apple-icon-180x180.png', revision: '1' },
    { url: '/assets/img/icons/android-icon-192x192.png', revision: '1' },
    { url: '/assets/img/icons/favicon-32x32.png', revision: '1' },
    { url: '/assets/img/icons/favicon-96x96.png', revision: '1' },
    { url: '/assets/img/icons/favicon-16x16.png', revision: '1' },

    // css
    { url: '/assets/css/materialize.min.css', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: '1' },
    { url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: '1' },

    // scripts
    { url: '/assets/js/materialize.min.js', revision: '1' },
    { url: '/assets/js/idb.js', revision: '1' },
    { url: '/assets/js/nav.js', revision: '1' },
    { url: '/assets/js/db.js', revision: '1' },
    { url: '/assets/js/master.js', revision: '1' },
    { url: '/assets/js/api.js', revision: '1' },
    { url: '/assets/js/fcm-config.js', revision: '1' }
]

if(workbox){
    workbox.precaching.precacheAndRoute(CACHED_URLS)

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    )

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    )

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );
}

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
