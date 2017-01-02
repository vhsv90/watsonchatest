'use strict';
var express = require('express'),
    path = require('path'),
    cors = require('cors'),
    config = require('./config/config'),
    bodyParser = require('body-parser');

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

var api = express();
api.use(cors());
api.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
api.use(bodyParser.urlencoded({
    extended: true
}));
api.use(bodyParser.json());
api.post('/send', function (req, res) {
    var ConversationV1 = require('watson-developer-cloud/conversation/v1');
    var conversation = new ConversationV1({
        username: config.api_credentials.username,
        password: config.api_credentials.password,
        version_date: ConversationV1.VERSION_DATE_2016_09_20
    });

    conversation.message({
        input: { text: req.body.text },
        workspace_id: config.api_credentials.workspace_id
    }, function (err, response) {
        if (err) {
            console.log('ERROR@api.conversation.message: ' + err);
            return res.send(err);
        } else {
            return res.send(JSON.stringify(response, null, 2));
        }
    });
});
api.listen(505);