let express = require("express");
let bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.urlencoded({extended: true}));

let user = require('./app/database/user');

app.get("/url", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    user.findAll(res);
});

app.get("/conversations", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.query.id_user != null) {
        user.getConversations(res, req.query.id_user);
    }
    else {
        res.status(400);
        res.send('You should specify the id_user parameter.');
    }
});

app.all('/user', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    if (req.method === 'POST') {
        user.getUser(res, req.body.name, req.body.phoneNumber);
    } else {
        res.status(400);
        res.send('Invalid request, this method isn\'t allowed.');
    }
});

app.listen(3000, () => {
    console.log("Serveur is running on PORT 3000");
});
