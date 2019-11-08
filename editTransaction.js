// const mysql = require('mysql');
const moment = require('moment');
const database = require('./database.js');

function editCreationTime(idTransaksi, newStatus, response) {
    var query = `UPDATE transaksi SET status = ? where idTransaksi = ?`;

    let db = database.connect();

    db.run(query, [newStatus, idTransaksi],
        function (err) {
            if (err) {
                response.status(400).send("Wrong Query!");
                console.error(err.message);
            }
            response.send({
                idTransaksi: idTransaksi,
                status: newStatus
            });
        });

    database.end(db);
}

module.exports = function editTransaction(idTransaksi, response) {
    if (idTransaksi && response) {

        var now = moment();
        var waktuTransaksiDibuat;
        var selisihWaktuBookingBayar;
        var statusTerkini;

        let db = database.connect();
        var query = `SELECT creationTime, status from transaksi where idTransaksi = ?`;

        db.get(query, idTransaksi, (err, row) => {
            // console.log(row);
            if (err) response.status(400).send("Wrong Query!");
            waktuTransaksiDibuat = row.creationTime;
            statusTerkini = row.status;
            waktuTransaksiDibuat = moment(waktuTransaksiDibuat);
            selisihWaktuBookingBayar = now.diff(waktuTransaksiDibuat, 'seconds');
            // console.log(selisihWaktuBookingBayar);

            if (selisihWaktuBookingBayar > 10 && statusTerkini != "success") {
                statusTerkini = "cancelled";
            } else {
                statusTerkini = "success";
            }

            editCreationTime(idTransaksi, statusTerkini, response);

        });

        database.end(db);
    } else {
        response.status(400).send("Wrong Query!");
    }
}