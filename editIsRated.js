const mysql = require('mysql');
const { user, password } = require("./config");

module.exports = function editIsRated(idTransaksi, val, response) {
    if (idTransaksi && (val || val == 0) && response) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        connection.connect();

        var query = `UPDATE TransaksiTiket SET isRated =? WHERE idTransaksi =?`;
        connection.query(query, [val, idTransaksi], function (err, result) {
            if (err) {
                console.log(err);
                response.status(400).send("Wrong Query!");
            }
            response.sendStatus(200);
        });

        connection.end();
    } else {
        response.status(400).send('Wrong Query!');
    }
}

