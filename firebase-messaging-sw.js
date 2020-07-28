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