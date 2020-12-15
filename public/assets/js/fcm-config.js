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
firebase.analytics();

const messaging = firebase.messaging()
messaging.usePublicVapidKey('BGsp3j8F9q21PzAl94l_OXOrWuS3UPHJTXlt3jG1vwoWQAT5ONYf0AnoKn_F33UCiMrd2aMz2WIeu5py4W304xA')