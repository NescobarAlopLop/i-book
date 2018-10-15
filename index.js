#!/usr/bin/env node

const path = require('path');
const PORT = process.env.PORT || 8000;

let express = require('express');
let bodyParser = require('body-parser');
let logRequest = require('log-request');

let i_book_router = express.Router();
i_book_router.get('/:name', findIpByName);
i_book_router.post('/', storeIP);

let app = express();        // https://expressjs.com/en/guide/routing.html
app.use(bodyParser.json({ type: 'application/json' }))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/update_ip', i_book_router)
    .use('/', express.static(path.join(__dirname, 'public')))
    .get('/get_all', getAllIps);

function findIpByName(req, res) {
    console.log('looking for IP');
    return res.json({
        message: 'looking for IP'
    });
}

function storeIP(req, res) {
    console.log('stroring ip');
    return res.json({
        message: 'stroring ip'
    });
}

function getAllIps(req, res) {
    console.log('getting all ips');
    return res.json({
        message: 'getting all ips'
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
