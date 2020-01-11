let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'freetext'
});

connection.connect();

module.exports = {
    connection
};
