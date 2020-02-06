import { timestampToString, executeQuery } from "../util";



// Recover all participants for a given user's conversations
export function get(id_user) {
    let query = `select p2.* from participant as p1 join participant as p2 on
                 p1.id_conversation = p2.id_conversation where p1.id_user != p2.id_user
                 and p1.id_user = ${id_user}`;
    return executeQuery(query);
}


// Register a new participant
export function add(id_user, id_conversation, nickname, timestamp) {
    let query = `insert into participant(id_user, id_conversation, nickname, timestamp)
                 values (${id_user}, ${id_conversation}, ${nickname ? nickname : 'NULL'},
                 ${timestampToString(timestamp)})`;
    return executeQuery(query)
        .then(result => new Promise(resolve => resolve(result.insertId)));
}
