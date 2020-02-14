// Imports
let mysql = require('mysql');


// Local connection
let connection = mysql.createConnection({
    host: 'localhost', // host of the database
    user: 'root', // username to access the database
    password: 'root', // password to access the database
    database: 'freetext' // database name
});


// Connect to the database
connection.connect();


// Export of the module
module.exports = {
  connection
};
