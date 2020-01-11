let express = require("express");
let app = express();

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

app.listen(3000, () => {
    console.log("Serveur is running on PORT 3000");
});
