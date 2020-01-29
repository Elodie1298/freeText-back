let connection = require('./connect').connection;

function findAll(res) {
    return connection.query('SELECT * from user', (err, rows, _) => {
        if (err) throw err;
        res.json(rows);
    });
}

function getConversations(res, id_user) {
    return connection.query(
        `SELECT conversation.id_conversation, title, participant.id_user, surname, name, content, timestamp 
        FROM conversation NATURAL JOIN participant NATURAL JOIN user LEFT JOIN message 
        ON conversation.id_conversation = message.id_conversation AND participant.id_user = message.id_user 
        WHERE conversation.id_conversation IN (SELECT id_conversation FROM participant WHERE id_user = ${id_user})`,
        (err, rows, _) => {
            if (err) throw err;
            res.json(rows);
        }
    )
}

function getUser(res, name, phoneNumber) {
    return new Promise(resolve => {
        connection.query(`SELECT id_user FROM user WHERE phone_number='${phoneNumber}'`,
            (err, rows, _) => {
                if (err) throw err;
                if (rows[0]) {
                    res.json(rows[0].id_user);
                    resolve(true);
                }
                resolve(false);
            });})
        .then(answer => new Promise(resolve => {
            if (!answer) {
                connection.query(`INSERT INTO user (name, phone_number) VALUES ('${name}', '${phoneNumber}')`,
                    (err, rows, _) => {
                        if (err) throw err;
                        res.json(rows.insertId);
                    })
            }
            resolve(true);
        }));
}

module.exports = {
    findAll,
    getConversations,
    getUser
};
