let express = require("express");
let app = express();

let user = require('./app/database/user');

app.get("/url", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    user.findAll(res);
});

app.listen(3000, () => {
    console.log("Serveur is running on PORT 3000");
});
