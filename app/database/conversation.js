let executeQuery = require("../util").executeQuery;


// Recover all conversations for a given user
function get(id_user, timestamp) {
    let query = `SELECT conversation.* FROM conversation 
                 NATURAL JOIN participant WHERE id_user=${id_user}`;
    if (timestamp != null) {
        query += ` and conversation.timestamp > '${timestamp}'`;
    }
    return executeQuery(query);
}


// Register a new conversation
function add(title, timestamp) {
    let query = `insert into conversation (title, timestamp) values
                 ('${title ? title : 'NULL'}', '${timestamp}')`;
    return executeQuery(query)
        .then(result => new Promise(resolve => resolve(result.insertId)));
}


// Export of the module
module.exports = {
    get,
    add
};
