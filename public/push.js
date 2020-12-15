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
    'endpoint': 'https://fcm.googleapis.com/fcm/send/eMEk7QJCwu4:APA91bGGQDz3qH5uSDJabTJjcCPov2SuTimMjWXYjbkkQi32xcfloOimLUlcrpa50PtTgx4ALUmBlbkTzwqQGC-LyWaIpfGzIOrtjhNlxJFMaBgu7fnCQitNLObALt1zVYbLT_-aUrsM',
    'keys': {
        'p256dh': 'BPRGWcB/XMBddg3/5DqbHRzA16Td7c5VJ6v1DngiKN718gM662D2MShcQWVC/gNkvJOlEeqEMbeihxGHt23gYlc=',
        'auth': 'bnmdosczrGSV4cXWYPUsKw=='
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