const mysql = require('mysql');
const { user, password } = require("./config");

module.exports = function getTransaction(idUser, response) {
    if (idUser && response) {

        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        connection.connect();

        var query = `SELECT * FROM TransaksiTiket WHERE idUser = ? ORDER BY creationTime DESC`;

        connection.query(query, [idUser],
            function (err, result) {
                if (err) {
                    response.status(400).send("Wrong Query!");
                }

                response.send({ transaction : result });
            });

        connection.end();
    } else {
        response.status(400).send("Wrong Query!");
    }
}
