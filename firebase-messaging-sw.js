// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDRW88ThMD_Oqse2gDHoDOmuI90-8jQI2o",
    authDomain: "talkod-backend.firebaseapp.com",
    projectId: "talkod-backend",
    storageBucket: "talkod-backend.appspot.com",
    messagingSenderId: "384579638016",
    appId: "1:384579638016:web:b4bb289ebe72d26ad0d9e5",
    measurementId: "G-TJQTGN6QPG",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/icon.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
