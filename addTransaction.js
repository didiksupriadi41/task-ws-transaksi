const mysql = require('mysql');
const moment = require('moment');
const { user, password, defaultStatus } = require("./config");

module.exports = function addTransaction(idUser, virtualAccount, idMovie, idSchedule, seat, response) {
    if (idUser && virtualAccount && idMovie && idSchedule && seat && response) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        var now = moment().format("YYYY-MM-DD HH:mm:ss");

        connection.connect();

        var query = `INSERT INTO TransaksiTiket \
        (idUser, virtualAccount, idMovie, idSchedule, seat, creationTime, status) \
        VALUE (?,?,?,?,?,?,?)`;

        connection.query(query, [idUser, virtualAccount, idMovie, idSchedule, seat, now, defaultStatus],
            function (err, result) {

                if (err) {
                    response.status(400).send("Wrong Query!");
                    console.log(err);
                }
                var idTransaksi = result.insertId;

                response.send({ idTransaksi: idTransaksi });
            });

        connection.end();
    } else {
        response.status(400).send("Wrong Query!");
    }
}