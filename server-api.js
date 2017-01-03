//*** Local API Section ***/
var express = express || require('express'),
    cors = cors || require('cors'),
    config = config || require('./config/config'),
    bodyParser = bodyParser || require('body-parser');

var api = express();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var conversation = new ConversationV1({
    username: config.api_credentials.username,
    password: config.api_credentials.password,
    version_date: ConversationV1.VERSION_DATE_2016_09_20
});

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
api.post('/api/send', function (req, res) {
    conversation.message({
        input: { text: req.body.text },
        workspace_id: config.api_credentials.workspace_id,
        context: req.body.context || {}
    }, function (err, response) {
        if (err) {
            console.log('ERROR@api.conversation.message: ' + err);
            return res.send(err);
        } else {
            return res.send(JSON.stringify(response, null, 2));
        }
    });
});
api.listen(process.env.PORT || 505);