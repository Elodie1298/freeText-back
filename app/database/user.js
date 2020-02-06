let util = require('../util');


// Recover user id based on its informations
export function login(name, phoneNumber) {
    return new Promise((resolve, reject) => {
        let queryGet = `SELECT id_user FROM user WHERE phone_number='${phoneNumber}'`;
        util.executeQuery(queryGet)
            .then(rows => {
                if (rows[0]) {
                    resolve(rows[0])
                } else {
                    let queryInsert = `INSERT INTO user (name, phone_number) VALUES
                                       ('${name}', '${phoneNumber}')`;
                    return util.executeQuery(queryInsert);
                }
            })
            .then(rows => {
                resolve(rows.insertId);
            })
            .catch(err => reject(err));
    });
}
