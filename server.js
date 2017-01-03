'use strict';
var express = express || require('express'),
    path = require('path');

require('./server-api');

var app = express();
var cacheTime = 86400000 * 7;
app.use(express.static(path.join(__dirname, 'src'), {
    etag: false,
    maxage: cacheTime
}));
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});
app.listen(500);