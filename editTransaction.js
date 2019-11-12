const mysql = require('mysql');
const moment = require('moment');
const { user, password } = require("./config");

function editCreationTime(idTransaksi, newStatus, response) {
    if (idTransaksi && newStatus && response) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        connection.connect();

        var query = `UPDATE TransaksiTiket SET status =? where idTransaksi =?`;
        connection.query(query, [newStatus, idTransaksi], function (err) {
            if (err) response.status(400).send("Wrong Query!");

            response.send({
                idTransaksi: idTransaksi,
                status: newStatus
            });
        });

        connection.end();
    } else {
        response.status(502).send('Somwthing went wrong :/');
    }
}

module.exports = function editTransaction(idTransaksi, response) {
    if (idTransaksi && response) {

        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        var now = moment();
        var waktuTransaksiDibuat;
        var selisihWaktuBookingBayar;
        var statusTerkini;

        connection.connect();
        var query = `SELECT creationTime, status from TransaksiTiket where idTransaksi = ${idTransaksi}`;
        connection.query(query, async function (err, result) {
            if (err) response.status(400).send("Wrong Query!");
            await (result);
            if (result.length > 0){
                statusTerkini = result[0].status;
                waktuTransaksiDibuat = moment(result[0].creationTime);
                selisihWaktuBookingBayar = now.diff(waktuTransaksiDibuat, 'seconds')

                if (selisihWaktuBookingBayar > 120 && statusTerkini != 'success') {
                    statusTerkini = "cancelled";
                } else {
                    statusTerkini = "success";
                }

                editCreationTime(idTransaksi, statusTerkini, response);
            } else {
                response.status(403).send('Forbidden');
            }
        });

        connection.end();
    } else {
        response.status(400).send("Wrong Query!");
    }
}