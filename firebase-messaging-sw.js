importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');
let firebaseConfig = {
    apiKey: "AIzaSyA_u7j6coHrA_ir9KqND0ocegJf5Dsq_H8",
    authDomain: "dicoding-pwa-wigunarrr.firebaseapp.com",
    projectId: "dicoding-pwa-wigunarrr",
    storageBucket: "dicoding-pwa-wigunarrr.appspot.com",
    messagingSenderId: "790958902989",
    appId: "1:790958902989:web:f60a1984e9c07843b9a384",
    measurementId: "G-QFBWVR5W3H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging()

self.addEventListener('push', function (e) {
    let body, options

    if(e.data){
        body = e.data.text()
        console.log(body)
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
}, false)


messaging.setBackgroundMessageHandler((payload) => {

    console.log("backgroundMessage")

    let messageTitle = "MESSAGETITLE"
    let messageBody = "MESSAGEBODY"

    return self.registration.showNotification(
        messageTitle,
        {
            body: messageBody,
            tag: messageTag
        });
});