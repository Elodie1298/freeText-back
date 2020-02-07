import { timestampToString, executeQuery } from "../util";


// Recover all conversations for a given user
export function get(id_user, timestamp) {
    let query = `SELECT conversation.* FROM conversation 
                 NATURAL JOIN participant WHERE id_user=${id_user}`;
    if (timestamp != null) {
        query += ` and conversation.timestamp > '${timestampToString(timestamp)}'`;
    }
    return executeQuery(query);
}


// Register a new conversation
export function add(title, timestamp) {
    let query = `insert into conversation (title, timestamp) values
                 ('${title ? title : 'NULL'}', '${timestampToString(timestamp)}')`;
    return executeQuery(query)
        .then(result => new Promise(resolve => resolve(result.insertId)));
}
