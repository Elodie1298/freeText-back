import { connection } from "./database/connect";


// Execute the given query and return the result as a promise
export function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, _) => {
            if (err) reject(err);
            else resolve(rows);
        })
    });
}


// Handle bad request
export function badRequest(res) {
    res.status(400);
    res.send('Invalid request, this method isn\'t allowed.');
}


// Get database formed string for timestamp
export function timestampToString(timestamp) {
    return new Date(timestamp).toISOString()
        .replace('T', ' ').split('.')[0]
}
