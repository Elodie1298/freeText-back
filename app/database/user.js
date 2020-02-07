

// Get user from id
import {executeQuery} from "../util";


// Recover user from id
export function get(id_user) {
    let query = `select * from user where id_user = ${id_user}`;
    return executeQuery(query);
}


// Recover user id based on its informations
export function login(name, phoneNumber) {
    return new Promise((resolve, reject) => {
        let queryGet = `SELECT id_user FROM user WHERE phone_number='${phoneNumber}'`;
        executeQuery(queryGet)
            .then(rows => {
                if (rows[0]) {
                    resolve(rows[0])
                } else {
                    let queryInsert = `INSERT INTO user (name, phone_number) VALUES
                                       ('${name}', '${phoneNumber}')`;
                    return executeQuery(queryInsert);
                }
            })
            .then(rows => {
                resolve(rows.insertId);
            })
            .catch(err => reject(err));
    });
}
