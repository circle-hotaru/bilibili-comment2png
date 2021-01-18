/**
 * 直接访问 Bilibili API 会出现跨域问题，使用 node.js 实现服务器代理解决跨域问题
 */


// express, http
const express = require('express');
const path = require('path');

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

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    request('http://api.bilibili.com/x/web-interface/view?bvid=' + req.query.bvid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });

});

app.get('/api/v1/comments', (req, res, next) => {

    // 白名單
    if (!req.get('Origin')) return;

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    request('http://api.bilibili.com/x/v2/reply?type=1&oid=' + req.query.oid + '&sort=' + req.query.sort + '&pn=' + req.query.pn + '&ps=' + req.query.ps + '&nohot=1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });

});