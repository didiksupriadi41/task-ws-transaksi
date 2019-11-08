const mysql = require('mysql');
const moment = require('moment');
const defaultStatus = "pending";

module.exports = function addTransaction(idUser, virtualAccount, idMovie, idSchedule, seat, response) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ws-transaksi'
    });

    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    var idTransaksi = 0;

    connection.connect();

    var query = `INSERT INTO TransaksiTiket \
            (idUser, virtualAccount, idMovie, idSchedule, seat, creationTime, status) \
            VALUE (${idUser},${virtualAccount},${idMovie},${idSchedule},${seat},'${now}','${defaultStatus}')`;

    connection.query(query, function (err, result) {
        if (err) response.sendStatus(400).send("Wrong Query!");
        idTransaksi = result.insertId;

        response.send({ idTransaksi: idTransaksi });
    });

    connection.end();
}