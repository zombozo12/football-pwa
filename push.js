let web_push = require('web-push')
const vapid_keys = {
    'publicKey': 'BPEUw-_ZvYx7bbhbJODt9S4SEa1abryu4fjBPZuhMAgPJgBZs1pnSb6_1-ORvHbGidSlMgjteUdbDx9MHXKVD2E',
    'privateKey': 'gnH5ZTuja_i2IgwJjsWY0WyYDLDL_Tqr8Gs6Dukdcw8'
}

web_push.setVapidDetails(
    'mailto:me@wigunarrr.dev',
    vapid_keys.publicKey,
    vapid_keys.privateKey
)

let push_subscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/dgwfBCw26IQ:APA91bHzPQUWwvLfaZ9N91gyvh_pKm6QXOwoWoqkizkhBWmTCTLQywjuaAYPypTA6lQ_Mj3hd6SpA6eCL1_qU_GTp3Rs-yAPaB2gCdAqalVVn-CB_s4bPrCIlQtsbtiZqE7AKoxWm1Jo',
    'keys': {
        'p256dh': 'BDWEThQQ4XVeE1MCbo0andye3koQbQl34q5x+jlzSgehsJglP4M4xEOWMf2qP63G1+1AzIxstzQkLjg9WJol23w=',
        'auth': 'S2rp1sHSQ/Ak8INNIgmmKg=='
    }
}

let payload = 'Congrats!'
let options = {
    gcmAPIKey: '790958902989',
    TTL: 60
}

web_push.sendNotification(
    push_subscription,
    payload,
    options
)