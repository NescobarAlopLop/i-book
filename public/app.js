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
        }).then(() => {
            updateData();
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
        });
        tableCreate(docs);
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


function tableCreate(docs) {

    let tbdy = document.createElement('tbody');
    let body = document.getElementsByTagName('body')[0];

    let tbl = document.getElementsByTagName('table')[0];
    if (tbl == null) {
        tbl = document.createElement('table');
    }
    else {

    }
    docs.forEach((doc) => {
        tmp = doc.data();
        let data = doc.data();
        console.log(data.hostname);
        console.log(data.ip);
        console.log(data.last_updated);

        let tr = document.createElement('tr');
        // tr.appendChild(td);
        createTableRow(data).forEach( col => {
            tr.appendChild(col);
        })
        tbdy.appendChild(tr);
    });

    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');


    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}


function createTableRow(data) {

    let cols = [];
    for (let key in data) {
        console.log(key, data[key])
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(data[key]));
        cols.push(td);
    }
    return cols;
}
