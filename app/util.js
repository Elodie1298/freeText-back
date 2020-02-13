let connection = require("./database/connect").connection;


// Execute the given query and return the result as a promise
function executeQuery(query) {
    console.log(query); // WIP
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, _) => {
            if (err) reject(err);
            else resolve(rows);
        })
    });
}


// Handle bad request
function badRequest(res) {
    res.status(400);
    res.send('Invalid request, this method isn\'t allowed.');
}


// Export of the module
module.exports = {
    executeQuery,
    badRequest
};
