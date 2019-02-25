// document.addEventListener('DOMContentLoaded', function () {
//     // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//     // // The Firebase SDK is initialized and available here!
//     //
//     // firebase.auth().onAuthStateChanged(user => { });
//     // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
//     // firebase.messaging().requestPermission().then(() => { });
//     // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//     //
//     // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

//     try {
//         let app = firebase.app();
//         let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
//         document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
//     } catch (e) {
//         console.error(e);
//         document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
//     }
// });

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();
    const myPost = db.collection('address_book').doc('TFyTwoeKdntSOl924hua');

    myPost.onSnapshot()
        .then(doc => {
            const data = doc.data();
            document.write(data.address + `<br>`);
            document.write(data.hostname + `<br>`);
            document.write(data.createdAt + `<br>`);

        })
});


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user);
    }).catch(console.log);
}