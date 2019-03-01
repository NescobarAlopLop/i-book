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
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            let del = document.getElementById("message");
            let parent = del.parentElement;
            parent.removeChild(del);
            updateData();
        } else {
            // No user is signed in.
        }
    });
});


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user);
        updateData();

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
    let body = document.getElementsByTagName('body')[0];

    let tbl = document.getElementsByTagName('table')[0];
    if (tbl == null) {
        tbl = document.createElement('table');
    }
    else {
        // TODO:
    }

    docs.forEach((doc) => {
        let data = doc.data();

        let tr = document.getElementById(data.hostname);
        if (tr) {
            console.log(`update for ${data.hostname}`);
            let parent = tr.parentElement;
            parent.removeChild(tr);
            // tr.cells[1].innerText = data.ip;
            // tr.cells[1].setAttribute("href", data.ip);
            // tr.cells[2].textContent = data.last_updated;
        }
        // else {
            // let tr = document.createElement('tr');
        tr = document.createElement('tr');
            tr.setAttribute("id", data.hostname);
            createTableRow(data).forEach( col => {
                tr.appendChild(col);
            })
            tbl.appendChild(tr);
        // }
    });

    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    body.appendChild(tbl)
}


function createTableRow(data) {

    let cols = [];
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(data.hostname));
    cols.push(td);

    let link_text = document.createTextNode(data.ip);
    let anchor = document.createElement('a');
    anchor.setAttribute("href", `http://${data.ip}/`);
    anchor.appendChild(link_text);
    td = document.createElement('td');
    td.appendChild(anchor);
    cols.push(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(data.last_updated));
    cols.push(td);
    return cols;
}
