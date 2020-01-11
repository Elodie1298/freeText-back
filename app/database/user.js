let connection = require('./connect').connection;

function findAll(res) {
    return connection.query('SELECT * from user', (err, rows, _) => {
        if (err) throw err;
        res.json(rows);
    });
}

module.exports = {
    findAll
};
