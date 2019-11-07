const mysql = require('mysql');
const moment = require('moment');

function editCreationTime(idTransaksi, newStatus, response) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ws-transaksi'
    });

    connection.connect();

    var query = `UPDATE TransaksiTiket SET status = ${newStatus} where idTransaksi = ${idTransaksi}`;
    connection.query(query, function (err, result, fields) {
        if (err) response.sendStatus(400).send("Wrong Query!");

        response.send({ 
            idTransaksi: idTransaksi,
            status: newStatus
        });
    });

    connection.end();
}

module.exports = function editTransaction(idTransaksi, response) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ws-transaksi'
    });

    var now = moment();
    var waktuTransaksiDibuat;
    var selisihWaktuBookingBayar;

    connection.connect();
    var query = `SELECT creationTime from TransaksiTiket where idTransaksi = ${idTransaksi}`;
    connection.query(query, async function (err, result, fields) {
        if (err) response.sendStatus(400).send("Wrong Query!");
        await (waktuTransaksiDibuat = result[0].creationTime);
        waktuTransaksiDibuat = moment(waktuTransaksiDibuat);
        selisihWaktuBookingBayar = moment.duration(now.diff(waktuTransaksiDibuat, 'seconds'))
        // console.log(selisihWaktuBookingBayar);

        if (selisihWaktuBookingBayar > 120){
            var statusTerkini = "\'cancelled\'";
        } else {
            var statusTerkini = "\'success\'";
        }    

        editCreationTime(idTransaksi, statusTerkini, response);
    });

    connection.end();
}