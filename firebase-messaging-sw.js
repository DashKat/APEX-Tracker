importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js");
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js");

var firebaseConfig = {
    apiKey: "AIzaSyArF9938lknESOsDXTlQ1hYaLira5wMrs8",
    authDomain: "apex-tracking.firebaseapp.com",
    databaseURL: "https://apex-tracking.firebaseio.com",
    projectId: "apex-tracking",
    storageBucket: "apex-tracking.appspot.com",
    messagingSenderId: "433029812902",
    appId: "1:433029812902:web:130652de8d37c676571a67",
    measurementId: "G-1ZDWYD57G0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});