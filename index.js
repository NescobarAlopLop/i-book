#!/usr/bin/env node

const path = require('path');
const PORT = process.env.PORT || 8000;

let express = require('express');
let bodyParser = require('body-parser');
let logRequest = require('log-request');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;

let i_book_router = express.Router();
i_book_router.get('/:name', findIpByName);
// i_book_router.post('/store', storeIP);

let app = express();        // https://expressjs.com/en/guide/routing.html
app.use(bodyParser.json({ type: 'application/json' }))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/update_ip', i_book_router)
    .use('/', express.static(path.join(__dirname, 'public')))
    .get('/get_all', getAllIps);

// load credentials from file for local use or process.env if on heroku
if (fs.existsSync('./credentials.json')) {
    var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
}
else {
    var credentials = process.env;
}

const mongo_uri = 'mongodb+srv://' + credentials.mongoUser + ':' +
    credentials.mongoPass + '@' +
    credentials.mongoServer + '/' +
    credentials.mongoDB
    + "?retryWrites=true";

function findIpByName(req, res) {
    console.log('looking for IP');
    return res.json({
        message: 'looking for IP'
    });
}

// function storeIP(req, res) {
//     console.log('Storing ip');
//     MongoClient.connect(mongo_uri, { useNewUrlParser: true }, function (err, db) {
//         // assert.equal(null, err);
//         if (err) {
//             console.error(err);
//             res.statusCode = 500;
//             return res.json({
//                 errors: ['Couldnt connect to server']
//             });
//         }
//         console.log("Connected correctly to Mongo server");
//         const dbo = db.db(credentials.mongoDB);
//         let address = req.body;
//         // if ('notes' in address) {
//             // if (address.notes.length <= max_notes) {
//         const collection = dbo.collection(credentials.mongoCollection);
//                 collection.insertOne(address, function (err, result) {
//                     if (err) {
//                         console.error(err);
//                         res.statusCode = 500;
//                         return res.json({
//                             errors: ['Failed to save a song']
//                         })
//                     }
//                     res.setHeader('Content-Type', 'application/json');
//                     res.statusCode = 201;
//                     let saved_song_id = result.ops[0]._id;
//                     console.log("one song inserted into db, song id: " + saved_song_id);
//                     res.json(saved_song_id);
//                     db.close();
//                 });
//             // }
//             // else {
//                 // badSaveObject(res, 'Notes array is limited to ' + max_notes + ' notes');
//             // }
//     //     }
//     //     else {
//     //         badSaveObject(res, 'Wrong object.');
//     //     }
//     });
// }

function getAllIps(req, res) {
    console.log('getting all ips');

    MongoClient.connect(mongo_uri, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            console.error("Getting all addresses failed: " + err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            return res.json({
                errors: ['Couldnt connect to data server']
            });
        }
        console.log("Connected to Mongo server");

        let dbo = db.db(credentials.mongoDB);
        dbo.collection(credentials.mongoCollection).find({}).toArray((err, result) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                return res.json({errors: ['Couldnt count songs']});
            }
            console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            // result.errors = [];
            res.json(r);
            db.close();
        })
    });
}

app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});

// instead of sending 400
app.get('*', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 400;
    res.sendFile(path.join(__dirname, '42.html'));
});

const server = app.listen(PORT, "", function () {
    let host = server.address().address
    let port = server.address().port;
    const computerName = require('os').hostname();
    console.log("name: " + computerName);
    console.log("i-book app listening on http://%s:%s", host, port);
})
