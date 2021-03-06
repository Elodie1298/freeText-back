let executeQuery = require("../util").executeQuery;


// Recover all messages of the conversations where the user takes part
function get(id_user, timestamp) {
    let query = `select message.* from participant join message on
                 participant.id_conversation = message.id_conversation where
                 participant.id_user = ${id_user}`;
    if (timestamp != null) {
        query += ` and message.timestamp > '${timestamp}'`;
    }
    return executeQuery(query);
}


// Register a new message
function add(id_conversation, id_user, content, timestamp) {
    let query = `insert into message (id_conversation, id_user, content, timestamp)
                 values (${id_conversation}, ${id_user}, '${content}',
                 '${timestamp}')`;
    return executeQuery(query)
        .then(result => new Promise(resolve => resolve(result.insertId)));
}



// Export of the module
module.exports = {
    get,
    add
};
