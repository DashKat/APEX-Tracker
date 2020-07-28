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
var database = firebase.database();
var dataRead = firebase.database().ref('/Test/Location/');
var coordinates, lat, long, comma, pLat, pLong, time1, time2, pCoordinates, time, timeNow;

// Messaging Start ===================================================================================================================

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BDziuOWEeIf1xLHtjQ5A1JPiN2wESbf5qZEgGWXBlfLAFWBbQ-YR8Ow1bTNeNhSaS6iDtGownVpUzNJMfhCPX4k");

messaging.getToken()
.then((currentToken) => {
    if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
    }
    })
.catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
});

messaging.onTokenRefresh(() => {
    messaging.getToken()
    .then((refreshedToken) => {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
    })
    .catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage((payload) => {
    console.log(payload);
    
});

// End Messaging =====================================================================================================================


function coordInner(snap) {
    firebase.database().ref('/Test/Location/').on('value', function(snapshot) {
        lat = coordInner(snapshot.val());
        console.log(lat);
    });

    // Splitting up the input
    comma = coordinates.indexOf(",");
    lat = coordinates.slice(0, comma);
    long = coordinates.slice(comma + 1, coordinates.length + 1);

    return lat;
}

function getCoords() {
    firebase.database().ref('MemberNames/').once('value').then(function(names) {
    
        firebase.database().ref('Location/').on('value', function(snapshot) {
            var nameRaw = names.val();
            console.log(nameRaw);
            console.log(snapshot.val());
        });
    });
}

firebase.database().ref('Location/').on('value', function(snapshot) {
    firebase.database().ref('MemberNames/').once('value').then(function(names) {
        
    });
});            

function compare() {
    var d = new Date();
    timeNow = d.getHours() * 60 + d.getMinutes();
    

    if ((time1 <= timeNow) && (timeNow <= time2)) {
        firebase.database().ref('Test/').set({LocationState: "safe"});
        if (((lat < (pLat - 0.0005)) || (lat > (pLat + 0.0005))) || ((long < (pLong - 0.0005)) || (long > (pLong + 0.0005)))) {
            firebase.database().ref('Test/').set({LocationState: "unsafe"});
            
        }

        else {
            firebase.database().ref('Test/').set({LocationState: "safe"});
        }
    }

    else {
        firebase.database().ref('Test/').set({LocationState: "unsafe"});
    }

    // Fix database structure here... Maybe have a tab for LocationState and then contain all of the names
}

function getSchedule() {
    firebase.database().ref('Schedule/').on('value', function(snapshot) {
        pCoordinates = snapshot.val();
        time = snapshot.val().slice(snapshot.val().indexOf("[") + 1, snapshot.val().indexOf("]"));
        

        pCoordinates = pCoordinates.slice(pCoordinates.indexOf("(") + 1, pCoordinates.indexOf(")"));
        pLat = pCoordinates.slice(0, pCoordinates.indexOf(","));
        pLong = pCoordinates.slice(pCoordinates.indexOf(",") + 1, pCoordinates.length + 1)
        
        time1 = time.slice(0, time.indexOf(","));
        time2 = time.slice(time.indexOf(",") + 1, time.length + 1);
        
        time1 = parseInt(time1.slice(0, time1.indexOf(":"))) * 60 + parseInt(time1.slice(time1.indexOf(":") + 1, time1.length + 1));
        time2 = parseInt(time2.slice(0, time2.indexOf(":"))) * 60 + parseInt(time2.slice(time2.indexOf(":") + 1, time2.length + 1));
    
        compare();

    });
}