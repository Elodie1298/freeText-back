// Imports
let mysql = require('mysql');


// Local connection
export let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'freetext'
});


// // Prod connection
// let connection = mysql.createConnection({
//     host: 'localhost:3306',
//     user: 'freetextApp',
//     password: 'wQ$2p23g',
//     database: 'freetext'
// });


// Connect to the database
connection.connect();
