document.addEventListener("DOMContentLoaded", event => {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyCGKv5N0ibfxCmJTFMzNkpipqsiGefiXxo",
        authDomain: "i-book-d5521.firebaseapp.com",
        databaseURL: "https://i-book-d5521.firebaseio.com",
        projectId: "i-book-d5521",
        storageBucket: "i-book-d5521.appspot.com",
        messagingSenderId: "866092882896"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
});


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user);
        // getData();
        const db = firebase.firestore();
        db.collection("address_book").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                console.log(`${doc.id} => ${data.ip}`);
                console.log(`${doc.id} => ${data.hostname}`);
                console.log(`${doc.id} => ${data.last_updated}`);
            });
        }).catch(console.log);
    }).catch(console.log);
}


function updateData() {
    const db = firebase.firestore();
    address_collection = db.collection("address_book");
    address_collection.onSnapshot((docs) => {
        docs.forEach((doc) => {
            let data = doc.data();
            console.log(`${doc.id} => ${data.ip}`);
            console.log(`${doc.id} => ${data.hostname}`);
            console.log(`${doc.id} => ${data.last_updated}`);
            document.getElementById('addresses').innerText += `${doc.id} => ${data.ip}`;
            document.getElementById('addresses').innerText += `${doc.id} => ${data.hostname}`;
            document.getElementById('addresses').innerText += `${doc.id} => ${data.last_updated}`;
        });
    });
}


function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("sign out OK");
    }).catch(function (error) {
        // An error happened.
        console.log('failed to sign out');
    });
}
