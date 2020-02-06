import { timestampToString, executeQuery } from "../util";


// Recover all conversations for a given user
export function get(id_user) {
    let query = `SELECT conversation.id_conversation, conversation.title FROM conversation 
                 NATURAL JOIN participant WHERE id_user=${id_user}`;
    return executeQuery(query);
}


// Register a new conversation
export function add(title, timestamp) {
    let query = `insert into conversation (title, timestamp) values
                 ('${title ? title : 'NULL'}', '${timestampToString(timestamp)}')`;
    return executeQuery(query)
        .then(result => new Promise(resolve => resolve(result.insertId)));
}
