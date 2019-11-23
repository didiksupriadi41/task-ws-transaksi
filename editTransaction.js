const mysql = require('mysql');
const moment = require('moment');
const { user, password, cancelledStatus, successStatus } = require("./config");

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

module.exports = function editTransaction(idTransaksi, waktuDariEngima, response) {
    if (idTransaksi && waktuDariEngima && response) {

        var connection = mysql.createConnection({
            host: 'localhost',
            user: user,
            password: password,
            database: 'ws-transaksi'
        });

        waktuDariEngima = moment(waktuDariEngima);
        var waktuTransaksiDibuat;
        var selisihWaktuBookingBayar;
        var statusTerkini;

        connection.connect();
        var query = `SELECT creationTime, status from TransaksiTiket WHERE idTransaksi=?`;
        connection.query(query, [idTransaksi], async function (err, result) {
            if (err) {
                response.status(400).send("Wrong Query!");
                console.log(err);
            }
            await (result);
            if (result.length > 0 && result[0].status == "pending") {
                statusTerkini = result[0].status;
                waktuTransaksiDibuat = moment(result[0].creationTime);
                selisihWaktuBookingBayar = waktuDariEngima.diff(waktuTransaksiDibuat, 'seconds')

                if (selisihWaktuBookingBayar > 120 && statusTerkini != successStatus) {
                    statusTerkini = cancelledStatus;
                } else {
                    statusTerkini = successStatus;
                }

                editCreationTime(idTransaksi, statusTerkini, response);
            } else if (result[0].status == successStatus || result[0].status == cancelledStatus) {
                response.status(403).send('Forbidden');
            } else {
                response.status(400).send('Wrong Query!');
            }
        });

        connection.end();
    } else {
        response.status(400).send("Wrong Query!");
    }
}