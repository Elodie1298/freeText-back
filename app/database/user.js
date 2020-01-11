let connection = require('./connect').connection;

function findAll(res) {
    return connection.query('SELECT * from user', (err, rows, _) => {
        if (err) throw err;
        res.json(rows);
    });
}

function getConversations(res, id_user) {
    return connection.query(
        `SELECT conversation.id_conversation, title, surname, name, content, timestamp 
        FROM conversation NATURAL JOIN participant NATURAL JOIN user LEFT JOIN message 
        ON conversation.id_conversation = message.id_conversation AND participant.id_user = message.id_user 
        WHERE conversation.id_conversation IN (SELECT id_conversation FROM participant WHERE id_user = ${id_user})`,
        (err, rows, _) => {
            if (err) throw err;
            res.json(rows);
        }
    )
}

module.exports = {
    findAll,
    getConversations
};
