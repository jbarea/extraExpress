let CONN = require('../connection/mysqlconnection');
let Users = {};

Users.fetchAll = (callback) => {
    if (!CONN) return callback(conError);
    const SQL = "SELECT * FROM users limit 5;";
    CONN.query(SQL, (error, rows) => {
        if (error) return callback(error);
        else
            return callback(null, rows);

    })
}
//id,user,email,password crear la base de datos con esos campos
Users.insert = (user, callback) => {
    if (!CONN) return callback(conError);
    console.log([film]);
    CONN.query('INSERT INTO users SET ?', [user], (error, result) => {
        if (error) return callback(error);

        return callback(null, result.insertId);
    });

}