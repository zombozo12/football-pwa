const API_KEY = 'acc36affa0d04e94b97655c93a0856c9'
const LEAGUE_ID = 2021

const base_url = 'https://api.football-data.org/v2/'
let standings = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
let matches = `${base_url}competitions/${LEAGUE_ID}/matches`
let teams = `${base_url}competitions/${LEAGUE_ID}/teams`

let fetch_api = (url) => {
    if("caches" in window){
        console.log("Fetch", 'caches found')
        caches.match(url).then((response) => {
            console.log('Fetch', 'Response: ' + response)
            if(response) return response
        })
    }

    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        },
    })
}

let status = (response) => {
    if (response.status !== 200)
        return Promise.reject(new Error(response.statusText));

    return Promise.resolve(response)
}

let json = (response) => {
    return response.json()
}

let error = (error) => {
    console.log(`API Error: ${error}`)
}

let get_standings = () => {
    return fetch_api(standings).then(status).then(json).catch(error)
}

let get_matches = () => {
    return fetch_api(matches).then(status).then(json).catch(error)
}

let get_teams = () => {
    return fetch_api(teams).then(status).then(json).catch(error)
}