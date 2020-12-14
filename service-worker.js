const CACHE_NAME = 'football-pwa-v2'
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
    '/assets/js/api.js'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Worker: cache installed')
            return cache.addAll(CACHED_URLS)
        })
    )
})

let network_cache = async (e) => {
    const API_KEY = 'acc36affa0d04e94b97655c93a0856c9'
    const LEAGUE_ID = 2021

    const base_url = 'https://api.football-data.org/v2/'
    let url_modified = ''
    let standings = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
    let matches = `${base_url}competitions/${LEAGUE_ID}/matches`
    let teams = `${base_url}competitions/${LEAGUE_ID}/teams`

    const url = new URL(e.request.url)
    let page = url.hash.substr(1)
    console.log(page)
    switch(page){
        case 'home':
            url_modified = standings
            break;
        case 'matches':
            url_modified = matches
            break;
        case 'teams':
            url_modified = teams
            break;
    }

    const cache = caches.default
    let response = await caches.match(e.request)

    if(!response){
        response = await fetch(`${url_modified}`, {mode: 'no-cors'})
        const headers = {'X-Auth-Token': API_KEY}
        response = new Response(response.body, { ...response, headers})
        e.waitUntil(cache.put(e.request, response.clone()))
    }
    return response
}

let local_cache = async (e) => {
    if(e.request.method === 'GET'){
        let response = await network_cache(e)
        if(response.status > 399){
            response = new Response(response.statusText, { status: response.status})
        }
        return response
    }else{
        return new Response('Method not allowed', {status: 405})
    }
}

self.addEventListener('fetch', e => {
    e.respondWith(local_cache(e))
})

/*self.addEventListener('fetch', (e) => {
    e.respondWith(
        async function(e){
            const cache = await caches.open(CACHE_NAME)
            const cache_response = await cache.match(e.request.url, {ignoreSearch: true})
            if(cache_response) return cache_response

            try{
                const network_response = await fetch(e.request)
                await cache.put(e.request.url, network_response.clone())
                console.log(e.request.url)
                return network_response
            }catch (e){
                console.error('Worker', 'Fetch error: ' + e)
            }
        }()
    )
})*/

/*self.addEventListener('fetch', e => {
    let base_url = "https://api.football-data.org/v2/";
    if (e.request.url.indexOf(base_url) > -1) {
        e.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(e.request).then(function(response) {
                    cache.put(e.request.url, response.clone())
                    return response;
                })
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request, {ignoreSearch:true}).then(function(response) {
                return response || fetch (e.request);
            })
        )
    }
})*/

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
