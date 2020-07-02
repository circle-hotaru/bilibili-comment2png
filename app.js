// express, http
const express = require('express');
const app = express();

// request
const request = require('request');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// port
const PORT = 8089;
app.listen(PORT);

// cross domain config
app.all('/api/v1', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.get('/api/v1/bv2av', (req, res, next) => {

    // 白名單
    if (!req.get('Origin')) return;

    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    request('https://api.bilibili.com/x/web-interface/view?bvid=' + req.query.bvid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });

});

app.get('/api/v1/comments', (req, res, next) => {

    // 白名單
    if (!req.get('Origin')) return;

    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    request('https://api.bilibili.com/x/reply?&pn=1&type=1&oid=' + req.query.oid + '&sort=2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });

});