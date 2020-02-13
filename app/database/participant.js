let executeQuery = require("../util").executeQuery;



// Recover all participants for a given user's conversations
function get(id_user, timestamp) {
    let query = `select p2.* from participant as p1 join participant as p2 on
                 p1.id_conversation = p2.id_conversation where p1.id_user = ${id_user}`;
    if (timestamp != null) {
        query += ` and p2.timestamp > '${timestamp}'`;
    }
    return executeQuery(query);
}


// Register a new participant
function add(id_user, id_conversation, nickname, timestamp) {
    let query = `insert into participant(id_user, id_conversation, nickname, timestamp)
                 values (${id_user}, ${id_conversation}, ${nickname ? nickname : 'NULL'},
                 '${timestamp}')`;
    return executeQuery(query)
        .then(result => new Promise(resolve => resolve(result.insertId)));
}


// Export of the module
module.exports = {
    get,
    add
};
