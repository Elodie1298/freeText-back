// Imports
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({extended: true}));

let badRequest = require('./app/util').badRequest;

// Import of database functions
let user = require('./app/database/user');
let message = require('./app/database/message');
let conversation = require('./app/database/conversation');
let participant = require('./app/database/participant');




// User functions
app.all('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === 'POST') {
        user.login(req.body.name, req.body.phoneNumber)
            .then(result => res.json(result));
    } else {
        badRequest(res);
    }
});

app.all('/user', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === 'GET') {
        user.get(req.query.id_user)
            .then(result => res.json(result));
    } else {
        badRequest(res);
    }
});


// Conversation functions
app.all('/conversations', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === 'GET') {
        if (req.query.id_user != null) {
            conversation.get(req.query.id_user, req.query.timestamp)
                .then(result => res.json(result));
        } else {
            res.status(400);
            res.send('You should specify the id_user.');
        }
    } else if (req.method === 'POST') {
        if (req.body.timestamp) {
            conversation.add(req.body.title, req.body.timestamp)
                .then(result => res.json(result));
        } else {
            res.status(400);
            res.send('You should specify the timestamp.');
        }
    } else {
        badRequest(res);
    }
});


// Message functions
app.all('/messages', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === 'GET') {
        if (req.query.id_user != null) {
            message.get(req.query.id_user, req.query.timestamp)
                .then(result => res.json(result));
        }
        else {
            res.status(400);
            res.send('You should specify the id_user.');
        }
    } else if (req.method === 'POST') {
        if (req.body.id_conversation &&
            req.body.id_user &&
            req.body.content &&
            req.body.timestamp) {
            message.add(req.body.id_conversation, req.body.id_user,
                             req.body.content, req.body.timestamp)
                .then(result => res.json(result));
        } else {
            res.status(400);
            res.send('You should specify the id_conversation, id_user, content' +
                ' and timestamp.');
        }
    } else {
        badRequest(res);
    }
});


// Participant functions
app.all('/participants', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === 'GET') {
        if (req.query.id_user != null) {
            participant.get(req.query.id_user, req.query.timestamp)
                .then(result => res.json(result));
        } else {
            res.status(400);
            res.send('You should specify the id_user.');
        }
    } else if (req.method === 'POST') {
        if (req.body.id_user &&
            req.body.id_conversation &&
            req.body.timestamp) {
            participant.add(req.body.id_user, req.body.id_conversation,
                            req.body.nickname, req.body.timestamp)
                .then(result => res.json(result));
        } else {
            res.status(400);
            res.send('You should specify the id_user, id_conversation and timestamp.');
        }
    } else {
        badRequest(res);
    }
});



// Let the app listen
app.listen(3000, () => {
    console.log("Serveur is running on PORT 3000");
});
